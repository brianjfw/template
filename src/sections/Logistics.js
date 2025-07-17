import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MediaData from '../MediaData.json';
import TextData from '../TextData.json';

const Section = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-column: auto !important;
    grid-row: auto !important;
  }
`;

const TrackingCard = styled(Card)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background: #fff;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${({ active }) => (active ? '#1a202c' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#4a5568')};
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
  box-sizing: border-box;
  
  &::placeholder {
    color: #a0aec0;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0.7rem 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.65rem 0.8rem;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 0.7rem;
  }
`;

const AddInputLink = styled.a`
  font-size: 0.8rem;
  color: #4a5568;
  text-decoration: underline;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const TrackButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${MediaData.color};
  color: ${props => props.theme.text};
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: auto;
`;

const ChartingCard = styled(Card)`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  padding: 0;
  color: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  .content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }

  .badge {
    background: ${MediaData.color};
    color: ${props => props.theme.text};
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }
  p {
    font-size: 0.9rem;
    opacity: 0.9;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const InnovationCard = styled(Card)`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  background: ${MediaData.color};
  color: #1a202c;
  padding: 0;

  .content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .badge {
    background: ${props => props.theme.text};
    color: ${props => props.theme.body};
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  img {
    width: calc(100% - 2rem);
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 1rem 1rem 1rem;
  }
`;

const SolutionsCard = styled(Card)`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: #1a202c;
  color: #fff;

  .icon-container {
    background: ${MediaData.color};
    color: ${props => props.theme.text};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }
  p {
    font-size: 0.9rem;
    opacity: 0.8;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SupportCard = styled(Card)`
  grid-column: 1 / 2;
  grid-row: 3 / 4;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .invoice-id {
    background: ${MediaData.color};
    color: ${props => props.theme.text};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .date {
    font-size: 0.9rem;
    color: #718096;
  }
  .total {
    margin-bottom: 2rem;
    p {
      color: #718096;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 700;
      color: ${MediaData.color};
    }
  }
  .link-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .url {
      background: #f7fafc;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #4a5568;
      border: 1px solid #edf2f7;
    }
    .send-link {
      background: #fff;
      border: 1px solid #e2e8f0;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .invited-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatars {
      display: flex;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid white;
        margin-left: -12px;
        &:first-child{
          margin-left: 0;
        }
      }
    }
    p {
      font-size: 0.9rem;
      color: #718096;
    }
  }

  @media (max-width: 768px) {
    grid-row: auto;
  }
`;

const PackagesCard = styled(Card)`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  
  h2 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.greyDark};
  }
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${props => props.theme.textSecondary};
  }
  p {
    font-size: 0.9rem;
    color: ${props => props.theme.grey};
  }
`;

const OceanFreightCard = styled(Card)`
  grid-column: 3 / 4;
  grid-row: 2 / 4;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  .content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: white;
  }
`;

const Icon = ({ children }) => <span style={{ fontFamily: 'Sirin Stencil' }}>{children}</span>;

const EdocsGrid = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EdocsWelcomeCard = styled(Card)`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-height: 300px;

  h3 {
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 1.2;
    z-index: 1;
    color: white;
  }

  @media (max-width: 1024px) {
    grid-column: auto !important;
    grid-row: auto !important;
  }
`;

const AiGeneratorButton = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1;

  .icon {
    background: ${MediaData.color};
    color: ${props => props.theme.text};
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .text strong {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
  }
  .text span {
    font-size: 0.8rem;
    opacity: 0.7;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const InvoiceInfoCard = styled(Card)`
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .invoice-id {
    background: ${MediaData.color};
    color: ${props => props.theme.text};
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .date {
    font-size: 0.9rem;
    color: #718096;
  }
  .total {
    margin-bottom: 2rem;
    p {
      color: #718096;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 700;
      color: ${MediaData.color};
    }
  }
  .link-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .url {
      background: #f7fafc;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #4a5568;
      border: 1px solid #edf2f7;
    }
    .send-link {
      background: #fff;
      border: 1px solid #e2e8f0;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .invited-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatars {
      display: flex;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid white;
        margin-left: -12px;
        &:first-child{
          margin-left: 0;
        }
      }
    }
    p {
      font-size: 0.9rem;
      color: #718096;
    }
  }
`;

const LeanaMessageCard = styled(Card)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      strong {
        font-weight: 600;
        display: block;
        color: #1a202c;
      }
      span {
        font-size: 0.8rem;
        color: #718096;
      }
    }
    
    .status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      
      &.online {
        background: #48bb78;
        box-shadow: 0 0 0 2px rgba(72, 187, 120, 0.2);
      }
    }
  }
  
  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
    
    .message-bubble {
      background: ${MediaData.color};
      color: ${props => props.theme.text};
      padding: 0.75rem 1rem;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      max-width: 85%;
      align-self: flex-start;
      position: relative;
      
      p {
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0 0 0.25rem 0;
        
        a {
          color: ${props => props.theme.text};
          text-decoration: underline;
          font-weight: 600;
        }
      }
      
      .time {
        font-size: 0.7rem;
        color: ${props => props.theme.text};
        font-weight: 500;
        opacity: 0.7;
      }
      
      &:nth-child(2) {
        background: #f1f5f9;
        color: #475569;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
        
        p {
          color: #475569;
        }
        
        p a {
          color: #475569;
        }
        
        .time {
          color: #475569;
          opacity: 0.7;
        }
      }
      
      &:nth-child(3) {
        background: ${MediaData.color};
        color: ${props => props.theme.text};
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 18px;
        align-self: flex-start;
        
        p a {
          color: ${props => props.theme.text};
        }
        
        .time {
          color: ${props => props.theme.text};
          opacity: 0.7;
        }
      }
    }
  }
`;

const FinanceTeamCard = styled(Card)`
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  background: #fff0f5;

  .header {
    margin-bottom: 1.5rem;
    h4 {
      font-size: 1rem;
      font-weight: 600;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .member {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      span {
        font-weight: 500;
      }
    }
    .status {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.9rem;
      font-weight: 500;

      &.signed { color: #38a169; }
      &.awaiting { color: #dd6b20; }
    }
  }
`;

const Logistics = () => {
  return (
    <Section>
      <Grid>
        <TrackingCard>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1a202c' }}>
            Get Started Today
          </h3>
          <Input placeholder="Full Name" />
          <Input placeholder="Email Address" />
          <Input placeholder="Company Name" />
          <Input placeholder="Phone Number" />
          <TrackButton>Sign Up Now</TrackButton>
        </TrackingCard>

        <ChartingCard>
          <img src={MediaData.image12} alt="Man with package" />
          <div className="content">
            <span className="badge">{TextData.whyChooseUsSection.badge}</span>
            <h3>{TextData.whyChooseUsSection.title}</h3>
            <p>{TextData.whyChooseUsSection.description}</p>
          </div>
        </ChartingCard>

        <InnovationCard>
          <div className="content">
            <span className="badge">{TextData.innovationSection.badge}</span>
            <h3>{TextData.innovationSection.title}</h3>
            <p>{TextData.innovationSection.description}</p>
          </div>
          <img src={MediaData.image13} alt="Innovation technology" />
        </InnovationCard>

        <SolutionsCard>
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          </div>
          <h3>{TextData.solutionsSection.title}</h3>
          <p>{TextData.solutionsSection.description}</p>
        </SolutionsCard>

        <SupportCard>
          <div className="info">
            <span className="invoice-id">{TextData.invoiceSection.invoiceId}</span>
            <span className="date">{TextData.invoiceSection.date}</span>
          </div>
          <div className="total">
            <p>Total:</p>
            <h2>{TextData.invoiceSection.total}</h2>
          </div>
          <div className="link-section">
            <span className="url">www.example.com/placeholder</span>
            <button className="send-link">Get Started</button>
          </div>
          <div className="invited-section">
            <div className="avatars">
              <img src={MediaData.image2} alt="User" />
              <img src={MediaData.image3} alt="User" />
              <img src={MediaData.image4} alt="User" />
            </div>
            <p>{TextData.invoiceSection.invitedText}</p>
          </div>
        </SupportCard>

        <PackagesCard>
          <h2>{TextData.packagesSection.number}</h2>
          <h4>{TextData.packagesSection.title}</h4>
          <p>{TextData.packagesSection.description}</p>
        </PackagesCard>

        <OceanFreightCard>
          <img src={MediaData.image15} alt="Ocean freight" />
          <div className="content">
            <h3>{TextData.oceanFreightSection.title}</h3>
          </div>
        </OceanFreightCard>
      </Grid>
      <EdocsGrid>
        <EdocsWelcomeCard>
          <h3>{TextData.edocsSection.title}</h3>
          {TextData.edocsSection.features.map((feature, index) => (
            <AiGeneratorButton key={index}>
              <div className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text">
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </div>
            </AiGeneratorButton>
          ))}
        </EdocsWelcomeCard>

        <LeanaMessageCard>
          <div className="header">
            <div className="user-info">
              <img src={MediaData.image5} alt="Leana" className="avatar" />
              <div>
                <strong>Leana</strong>
                <span>Account manager</span>
              </div>
            </div>
            <div className="status online"></div>
          </div>
          
          <div className="messages">
            {TextData.chatSection.messages.map((message, index) => (
              <div className="message-bubble" key={index}>
                <p>{message.text}</p>
                <span className="time">
                  {index === 0 ? "3 min ago" : index === 1 ? "2 min ago" : "1 min ago"}
                </span>
              </div>
            ))}
          </div>
        </LeanaMessageCard>


      </EdocsGrid>
    </Section>
  );
};

export default Logistics; 