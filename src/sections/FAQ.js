import React, { useState } from "react";
import styled from "styled-components";
import TextData from "../TextData.json";

const Section = styled.section`
  min-height: 60vh;
  width: 100vw;
  margin: 0 auto;
  padding: 4rem 0 1.5rem 0;
  background: ${(props) => props.theme.body};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${(props) => props.theme.text}, transparent);
  }

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const FAQList = styled.div`
  margin-top: 2rem;
`;

// Helper to determine if a hex color is light (consistent with other sections)
const isColorLight = (hex) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return false;
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map(ch => ch + ch).join('');
  }
  const bigint = parseInt(c, 16);
  if (Number.isNaN(bigint)) return false;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 186;
};

const FAQItem = styled.div`
  background: ${({ theme }) => (isColorLight(theme.body) ? theme.greyLight : theme.greyDark)};
  color: ${(props) => props.theme.text};
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(${(props) => props.theme.shadow});
  overflow: hidden;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(${(props) => props.theme.shadow}, 0.25);
  }

  @media (max-width: 48em) {
    margin-bottom: 1rem;
    border-radius: 15px;
  }
`;

const Question = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  text-align: left;
  padding: 1.5rem 2rem;
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 48em) {
    padding: 1rem 1rem;
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    padding: 0.75rem 0.5rem;
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const Answer = styled.div`
  max-height: ${({ expanded }) => (expanded ? '500px' : '0')};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
  overflow: hidden;
  background: ${({ theme }) => (isColorLight(theme.body) ? theme.body : theme.grey)};
  padding: ${({ expanded }) => (expanded ? '1rem 2rem 1.5rem 2rem' : '0 2rem')};
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};

  @media (max-width: 48em) {
    padding: ${({ expanded }) => (expanded ? '0.75rem 1rem 1rem 1rem' : '0 1rem')};
    font-size: ${(props) => props.theme.fontsm};
  }
  @media (max-width: 30em) {
    padding: ${({ expanded }) => (expanded ? '0.5rem 0.5rem 0.75rem 0.5rem' : '0 0.5rem')};
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const Chevron = styled.span`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  transition: transform 0.3s;
  transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(90deg)')};
  &::before {
    content: '';
    display: block;
    width: 0.6em;
    height: 0.6em;
    border-right: 3px solid ${(props) => props.theme.text};
    border-bottom: 3px solid ${(props) => props.theme.text};
    margin: 0.3em auto;
    transform: rotate(45deg);
  }
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const sectionData = TextData.faqSection;
  const faqs = sectionData.faqs;

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section id="faq">
      <Container>
        <Title>{sectionData.title}</Title>
        <FAQList>
          {faqs.map((faq, idx) => (
            <FAQItem key={idx}>
              <Question onClick={() => toggleFAQ(idx)} aria-expanded={openIndex === idx}>
                {faq.question}
                <Chevron expanded={openIndex === idx} />
              </Question>
              <Answer expanded={openIndex === idx}>{faq.answer}</Answer>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
};

export default FAQ; 