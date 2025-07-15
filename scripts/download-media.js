const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { createClient } = require('pexels');
const sharp = require('sharp');
const mediaData = require('../src/MediaData.json');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const MEDIA_JSON_PATH = path.join(__dirname, '../src/MediaData.json');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
} else {
  // Clear existing media
  fs.readdirSync(ASSETS_DIR).forEach((file) => {
    fs.unlinkSync(path.join(ASSETS_DIR, file));
  });
}

const downloadFile = async (url, filepath) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    let error = null;
    writer.on('error', (err) => {
      error = err;
      writer.close();
      reject(err);
    });
    writer.on('close', () => {
      if (!error) {
        resolve(true);
      }
    });
  });
};

const compressImage = async (filepath, quality = 80) => {
  const tempPath = `${filepath}.tmp`;
  try {
    await sharp(filepath)
      .resize(1920) // Resize to a max width of 1920px
      .jpeg({ quality })
      .toFile(tempPath);
    
    fs.renameSync(tempPath, filepath);
    console.log(`Compressed image: ${path.basename(filepath)}`);
  } catch (error) {
    console.error(`Failed to compress image ${path.basename(filepath)}:`, error);
  }
};

const processMedia = async () => {
  if (!process.env.PEXELS_API_KEY) {
    console.error('PEXELS_API_KEY environment variable is not set.');
    process.exit(1);
  }
  const client = createClient(process.env.PEXELS_API_KEY);
  const newMediaData = JSON.parse(JSON.stringify(mediaData));
  const downloadedVideos = [];

  // Process Videos
  let videoCounter = 1;
  for (const video of newMediaData.videos) {
    try {
      console.log(`Fetching video details for ID: ${video.id}`);
      const apiResponse = await client.videos.show({ id: video.id });

      let videoFile = apiResponse.video_files.find(
        (vf) => vf.quality === video.quality
      );

      if (!videoFile) {
        console.warn(
          `Could not find matching video quality for video ID ${video.id}. Selecting best available.`
        );
        videoFile = apiResponse.video_files.sort((a, b) => b.width - a.width)[0];
      }

      const downloadUrl = videoFile.link;
      const extension = path.extname(new URL(downloadUrl).pathname);
      const filename = `${videoCounter++}${extension}`;
      const filepath = path.join(ASSETS_DIR, filename);

      if (!fs.existsSync(filepath)) {
        console.log(`Downloading video: ${filename} from authorized URL.`);
        await downloadFile(downloadUrl, filepath);
      }
      video.link = `assets/${filename}`;
      downloadedVideos.push(video);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Video with ID ${video.id} not found. Skipping.`);
        continue;
      }
      console.error(
        `Failed to process video ID ${video.id}:`,
        error.message
      );
    }
  }

  newMediaData.videos = downloadedVideos;

  // Process Images
  let imageCounter = 1;
  for (const key in newMediaData) {
    if (key.startsWith('image')) {
      const originalUrl = newMediaData[key];
      if (!originalUrl.startsWith('https://')) {
        continue;
      }
      const match = originalUrl.match(/photos\/(\d+)\//);
      if (!match) {
        console.warn(
          `Could not extract photo ID from URL: ${originalUrl}. Skipping.`
        );
        continue;
      }
      const photoId = match[1];

      try {
        console.log(`Fetching photo details for ID: ${photoId}`);
        const apiResponse = await client.photos.show({ id: photoId });

        const downloadUrl = apiResponse.src.original;
        const extension = '.jpeg';
        const filename = `${imageCounter++}${extension}`;
        const filepath = path.join(ASSETS_DIR, filename);

        if (!fs.existsSync(filepath)) {
          console.log(`Downloading image: ${filename} from authorized URL.`);
          await downloadFile(downloadUrl, filepath);
          await compressImage(filepath);
        }
        newMediaData[key] = `assets/${filename}`;
      } catch (error) {
        console.error(
          `Failed to process photo ID ${photoId}:`,
          error.message
        );
      }
    }
  }

  fs.writeFileSync(MEDIA_JSON_PATH, JSON.stringify(newMediaData, null, 2));
  console.log('Media manifest updated successfully.');
};

processMedia().catch((error) => {
  console.error('Error processing media:', error);
  process.exit(1);
}); 