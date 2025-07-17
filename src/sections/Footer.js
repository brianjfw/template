import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiArrowRight, FiMail } from "react-icons/fi";

const Section = styled.footer`
  width: 100%;
  background-color: #0b0d17;
  color: #ffffff;
  padding: 5rem 8rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 4rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  width: 100%;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactSection = styled.div`
  h5 {
    font-size: 0.875rem;
    font-weight: 300;
    color: #d0d0d0;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h2 {
    font-size: 2.75rem;
    line-height: 1.2;
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #0b0d17;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f0f0f0;
    svg {
      transform: translateX(5px);
    }
  }
`;

const EmailSection = styled.div`
  margin-top: 2.5rem;

  h6 {
    font-size: 0.875rem;
    font-weight: 300;
    color: #d0d0d0;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const EmailButton = styled.a`
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LinksSection = styled.div`
  h5 {
    font-size: 0.875rem;
    font-weight: 300;
    color: #d0d0d0;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.875rem;
  color: #a0a0a0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: #ffffff;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #a0a0a0;
    }
  }
`;

const Footer = () => {
  return (
    <Section>
      <FooterContainer>
        <ContactSection>
          <h5>CONTACT US</h5>
          <h2>
            Let's Discuss Your
            <br />
            Vision. With Us
          </h2>
          <Button>
            Schedule a call now <FiArrowRight />
          </Button>
          <EmailSection>
            <h6>OR EMAIL US AT</h6>
            <EmailButton href="mailto:hey@xavierdubois.fr">
              hey@xavierdubois.fr <FiMail />
            </EmailButton>
          </EmailSection>
        </ContactSection>
        <LinksSection>
          <h5>QUICK LINKS</h5>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#case-studies">Case Studies</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#blogs">Blogs</a>
            </li>
            <li>
              <a href="#about">About Me</a>
            </li>
          </ul>
        </LinksSection>
        <LinksSection>
          <h5>INFORMATION</h5>
          <ul>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#cookies">Cookies Settings</a>
            </li>
          </ul>
        </LinksSection>
      </FooterContainer>
      <BottomBar>
        <span>© XAVIERDUBOIS 2024. ALL RIGHTS RESERVED.</span>
        <SocialIcons>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </SocialIcons>
      </BottomBar>
    </Section>
  );
};

export default Footer;
