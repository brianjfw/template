import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MediaData from '../MediaData.json';
import { light } from '../styles/Themes';
import TextData from '../TextData.json';

// --- STYLED COMPONENTS ---

const Section = styled.section`
  min-height: 80vh;
  height: auto;
  width: 100%;
  margin: 0;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Tag = styled.span`
  display: inline-block;
  color: ${MediaData.color};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.25rem 0.75rem;
  border: 1px solid ${MediaData.color};
  border-radius: 12px;
`;

const MainHeading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
`;

const SubHeading = styled.p`
  font-size: 1.125rem;
  color: #555;
  margin-top: 1rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: auto auto;
  gap: 2rem;
  
  grid-template-areas:
    "large medium"
    "large smalls";

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "large"
      "medium"
      "smalls";
  }
`;

const SmallCardsContainer = styled.div`
  grid-area: smalls;
  display: flex;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Card = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'isDark'
})`
  background: ${({ isDark }) => (isDark ? '#1C1C1E' : light.body)};
  color: ${({ isDark }) => (isDark ? '#FFFFFF' : light.text)};
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  
  &.large {
    grid-area: large;
  }
  &.medium {
    grid-area: medium;
  }
  &.small {
    flex: 1;
  }

  /* Ensure all text elements in dark cards are white, and in light cards use theme colors */
  ${({ isDark }) => isDark ? `
    h3, h4, p, span {
      color: #FFFFFF !important;
    }
    .stars {
      color: #ffb400 !important;
    }
  ` : `
    h3, h4 {
      color: ${light.text} !important;
    }
    p, span {
      color: ${light.textSecondary} !important;
    }
    .stars {
      color: #ffb400 !important;
    }
  `}
`;

const MetricSection = styled.div`
  margin-bottom: 1.5rem;
  h3 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1;
  }
  p {
    font-size: 1rem;
    font-weight: 500;
    color: #666;
  }
`;

const Quote = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  font-style: italic;
  margin-top: 1rem;
  flex-grow: 1;

  &::before {
    content: "“";
    font-size: 2.5rem;
    font-family: "Kaushan Script";
    color: ${MediaData.color};
    display: block;
    margin-bottom: -1.5rem;
    margin-left: -1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex-grow: 1;
  h4 {
    font-weight: 600;
  }
  p {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const CompanyLogo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  opacity: 0.8;
  color: ${MediaData.color};
  // In a real app, this would be an <img>
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const SatisfiedClients = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .stars {
    color: #ffb400;
  }
  .review-text {
    font-size: 0.9rem;
    color: #666;
  }
`;

const ViewAllButton = styled.a`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// --- DYNAMIC DATA ---
const testimonialsData = TextData.testimonialsSection2.testimonials.map((testimonial, index) => {
  // Add hardcoded avatar URLs based on index
  const avatarUrls = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg'
  ];
  
  return {
    ...testimonial,
    avatar: avatarUrls[index]
  };
});

// --- COMPONENTS ---

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card
      isDark={testimonial.isDark}
      className={testimonial.size}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {testimonial.metric && (
        <MetricSection>
          <h3>{testimonial.metric}</h3>
          <p>{testimonial.metricDescription}</p>
        </MetricSection>
      )}
      <Quote>
        {testimonial.quote.split(/\n\n+/).map((para, idx) => (
          <span key={idx} style={{ display: 'block', marginBottom: idx < testimonial.quote.split(/\n\n+/).length - 1 ? '1em' : 0 }}>{para}</span>
        ))}
      </Quote>
      <UserInfo>
        <Avatar src={testimonial.avatar} alt={testimonial.name} />
        <UserDetails>
          <h4>{testimonial.name}</h4>
          <p>{testimonial.title}</p>
        </UserDetails>
        {testimonial.logo && <CompanyLogo>{testimonial.logo}</CompanyLogo>}
      </UserInfo>
    </Card>
  );
};

const Testimonials = () => {
  return (
    <Section>
      <HeaderContainer>
        <Tag>{TextData.testimonialsSection2.tag}</Tag>
        <MainHeading>
          {TextData.testimonialsSection2.title}
        </MainHeading>
        <SubHeading>
          {TextData.testimonialsSection2.subtitle}
        </SubHeading>
      </HeaderContainer>

      <TestimonialsGrid>
        <TestimonialCard testimonial={testimonialsData[0]} />
        <TestimonialCard testimonial={testimonialsData[1]} />
        <SmallCardsContainer>
          <TestimonialCard testimonial={testimonialsData[2]} />
          <TestimonialCard testimonial={testimonialsData[3]} />
        </SmallCardsContainer>
      </TestimonialsGrid>

      <BottomBar>
        <SatisfiedClients>{TextData.testimonialsSection2.bottomBar.satisfiedClients}</SatisfiedClients>
        <Rating>
          <span className="stars">★★★★★</span>
          <span className="review-text">{TextData.testimonialsSection2.bottomBar.rating}</span>
        </Rating>
        <ViewAllButton href="#">{TextData.testimonialsSection2.bottomBar.viewAllButton}</ViewAllButton>
      </BottomBar>
    </Section>
  );
};

export default Testimonials;