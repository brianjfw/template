import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MediaData from "../MediaData.json";
import TextData from "../TextData.json";

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #000;
  padding: 6rem 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Header = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;

  h1 {
    font-size: 6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    margin: 0;
    color: #333;
  }
  
  .title-image {
    width: 200px;
    height: 80px;
    background: url(${MediaData.image11}) no-repeat center center;
    background-size: cover;
    border-radius: 100px;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 4rem;
    }
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: center;
    gap: 1rem;
    h1 {
      font-size: 3rem;
    }
    .title-image {
      width: 150px;
      height: 50px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee;
  position: relative;
  border-radius: 30px;
  overflow: hidden;

  &.large-vertical {
    grid-row: span 2;
    @media (max-width: 1024px) {
      grid-row: auto;
    }
  }


`;

const CollectionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  flex-grow: 1;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
    transition: all 0.3s;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0,0, 0,0.25);
  }

  .details {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #333;
    }
    p {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
    }
    button {
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #e0e0e0;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const PillTag = styled.span`
  display: inline-block;
  background: ${MediaData.color};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const KidsCollectionCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  flex-grow: 1;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
    transition: all 0.3s;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0,0, 0,0.25);
  }

  .details {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #333;
    }
    p {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
    }
    button {
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #e0e0e0;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 400px;
  margin-bottom: 2rem;
  perspective: 1000px;
`;

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  &.center {
    transform: translateZ(0) scale(1);
    z-index: 3;
    
    img {
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    }
  }

  &.left {
    transform: translateX(-60%) translateZ(-100px) rotateY(15deg) scale(0.8);
    z-index: 2;
    opacity: 0.7;
  }

  &.right {
    transform: translateX(60%) translateZ(-100px) rotateY(-15deg) scale(0.8);
    z-index: 2;
    opacity: 0.7;
  }

  &.far-left {
    transform: translateX(-120%) translateZ(-200px) rotateY(25deg) scale(0.6);
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }

  &.far-right {
    transform: translateX(120%) translateZ(-200px) rotateY(-25deg) scale(0.6);
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const CarouselButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#333' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#333' : '#bbb'};
  }
`;

const CrossfadeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0,0, 0,0.25);
  }
`;

const CrossfadeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
`;

const ElegantMovementCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  height: 100%;
  justify-content: space-between;
  
  .text-content {
    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
    }
  
    p {
      font-size: 1rem;
      color: #666;
      max-width: 450px;
      line-height: 1.6;
    }
  }
`;

const Movement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mensIndex, setMensIndex] = useState(0);
  const [kidsIndex, setKidsIndex] = useState(0);
  
  const carouselImages = [
    MediaData.image14,
    MediaData.image15,
    MediaData.image16,
    MediaData.image17,
    MediaData.image18
  ];

  const mensImages = [
    MediaData.image12,
    MediaData.image19,
    MediaData.image20
  ];

  const kidsImages = [
    MediaData.image13,
    MediaData.image21,
    MediaData.image22
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-advance carousels
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMensIndex((prevIndex) => (prevIndex + 1) % mensImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mensIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKidsIndex((prevIndex) => (prevIndex + 1) % kidsImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [kidsIndex]);

  const getCarouselItemClass = (index) => {
    const totalImages = carouselImages.length;
    const relativeIndex = (index - currentIndex + totalImages) % totalImages;
    
    switch (relativeIndex) {
      case 0:
        return 'center';
      case 1:
        return 'right';
      case totalImages - 1:
        return 'left';
      case 2:
        return 'far-right';
      case totalImages - 2:
        return 'far-left';
      default:
        return '';
    }
  };

  return (
    <Section>
      <Header>
        <h1>{TextData.movementSection.title.first}</h1>
        <div className="title-image" />
        <h1>{TextData.movementSection.title.second}</h1>
      </Header>
      <Grid>
        <Card>
          <CollectionCard>
            <CrossfadeContainer>
              {mensImages.map((image, index) => (
                <CrossfadeImage
                  key={index}
                  src={image}
                  alt={`Men's Collection ${index + 1}`}
                  active={index === mensIndex}
                />
              ))}
            </CrossfadeContainer>
            <div className="details">
              <PillTag>{TextData.movementSection.mensCollection.badge}</PillTag>
              <h3>{TextData.movementSection.mensCollection.title}</h3>
              <p>{TextData.movementSection.mensCollection.description}</p>
              <button>→</button>
            </div>
          </CollectionCard>
        </Card>
        <Card className="large-vertical">
          <ElegantMovementCard>
            <CarouselContainer>
              <CarouselTrack>
                {carouselImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className={getCarouselItemClass(index)}
                    onClick={() => goToSlide(index)}
                  >
                    <img src={image} alt={`Elegant Movement ${index + 1}`} />
                  </CarouselItem>
                ))}
              </CarouselTrack>

            </CarouselContainer>
            <div className="text-content">
              <h3>{TextData.movementSection.elegantMovement.title}</h3>
              <p>
                {TextData.movementSection.elegantMovement.description}
              </p>
            </div>
          </ElegantMovementCard>
        </Card>
        <Card>
          <KidsCollectionCard>
            <CrossfadeContainer>
              {kidsImages.map((image, index) => (
                <CrossfadeImage
                  key={index}
                  src={image}
                  alt={`Kids Collection ${index + 1}`}
                  active={index === kidsIndex}
                />
              ))}
            </CrossfadeContainer>
            <div className="details">
              <PillTag>{TextData.movementSection.kidsCollection.badge}</PillTag>
              <h3>{TextData.movementSection.kidsCollection.title}</h3>
              <p>{TextData.movementSection.kidsCollection.description}</p>
              <button>→</button>
            </div>
          </KidsCollectionCard>
        </Card>
      </Grid>
    </Section>
  );
};

export default Movement; 