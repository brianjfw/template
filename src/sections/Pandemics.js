import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGem, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import TextData from "../TextData.json";
import MediaData from "../MediaData.json";
import { light } from "../styles/Themes";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background: ${light.body};
  color: ${light.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-family: "Sirin Stencil";
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  box-shadow: 0 10px 30px rgba(${light.shadow});
  background: ${light.body};
  margin: 0;
`;

const Sidebar = styled.div`
  width: 22%;
  min-width: 280px;
  padding: 3rem;
  background: ${light.grey};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${light.border};
`;

const SidebarLogo = styled.div`
  margin-bottom: 2rem;
  
  a {
    display: flex;
    align-items: center;
  }
  
  svg {
    font-size: 2rem;
    color: ${light.greyDark};
  }
`;

const MainTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 3rem;
  font-family: "Kaushan Script";
  color: ${light.text};
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  li {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;
    color: ${light.textSecondary};
    &:hover {
      color: ${light.brandColor};
    }
  }
`;

const SocialLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    a {
      color: ${light.greyDark};
      font-size: 1rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;

      &:hover {
        color: ${light.text};
        transform: scale(1.05);
      }
    }
  }
`;

const TimelineContainer = styled.div`
  width: 78%;
  position: relative;
  overflow: hidden;
  background: ${light.body};
`;

const TimelineWrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  position: relative;
`;

const EventColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 0 2.5rem;
  border-left: 1px solid ${light.border};
  flex-shrink: 0;
  width: 380px;
  height: calc(100vh - 6rem);

  &:first-child {
    border-left: none;
    padding-left: 3rem;
  }
`;

const EventHeader = styled.div`
  margin-bottom: 4rem;
  display: flex;
  align-items: baseline;
`;

const Year = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${light.brandColor};
  margin: 0;
`;

const EventNumber = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${light.greyDark};
  margin-right: 0.75rem;
`;

const EventCard = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${light.text};
`;

const SpecialEventCard = styled(EventCard)`
  background: #a54f4f;
  color: white;
  padding: 2rem;
  margin-top: -2rem;

  .bg-virus {
    position: absolute;
    top: -50px;
    right: -60px;
    width: 200px;
    opacity: 0.15;
    pointer-events: none;
  }
`;

const EventName = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: ${light.textSecondary};
`;

const EventDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  white-space: normal;
  color: ${light.text};
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-top: 1.5rem;
  border-radius: 20px;
`;

const BlackAndWhiteImage = styled(EventImage)`
  margin-top: auto;
`;

const ExploreButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #a54f4f;
  }
`;



const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      delay: 3,
      ease: "easeInOut",
    },
  },
};

const Pandemics = () => {
  const faqData = TextData.faqSection;

  return (
    <Section>
      <MainContainer>
        <Sidebar>
          <SidebarLogo>
            <Link to="/">
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <FaGem />
              </motion.div>
            </Link>
          </SidebarLogo>
          <MainTitle>{TextData.brand.name}</MainTitle>
          <Menu>
            {TextData.sectionTitles.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Menu>
          <SocialLinks>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
                Instagram
              </a>
            </li>
          </SocialLinks>
        </Sidebar>
        <TimelineContainer>
          <TimelineWrapper>
            {faqData.faqs.slice(0, 3).map((faq, index) => {
              const faqContent = (
                <>
                  <EventName>{faq.question}</EventName>
                  <EventDescription>{faq.answer}</EventDescription>
                  <BlackAndWhiteImage src={MediaData[`image${index + 1}`]} alt={faq.question} />
                </>
              );

              return (
                <EventColumn
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <EventHeader>
                    <EventNumber>FAQ</EventNumber>
                    <Year>0{index + 1}</Year>
                  </EventHeader>

                  <EventCard>{faqContent}</EventCard>
                </EventColumn>
              );
            })}
          </TimelineWrapper>
        </TimelineContainer>
      </MainContainer>
    </Section>
  );
};

export default Pandemics; 