import React from 'react';
import styled from 'styled-components';

const MobileNoticeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 16px;
  text-align: center;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 8px;
  }
`;

const NoticeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px 20px;
  width: calc(100% - 32px);
  max-width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 20px 16px;
    width: calc(100% - 24px);
    max-width: 280px;
  }
  
  @media (max-width: 360px) {
    padding: 16px 12px;
    width: calc(100% - 16px);
    max-width: 260px;
  }
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  color: #667eea;
  line-height: 1;
  
  @media (max-width: 480px) {
    font-size: 56px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  font-family: "Sirin Stencil";
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 24px;
  font-family: "Sirin Stencil";
  
  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 16px;
  }
`;

const MobileNotice = () => {
  return (
    <MobileNoticeContainer>
      <NoticeCard>
        <Icon>💻</Icon>
        <Title>Desktop Only</Title>
        <Message>
          This is currently a desktop-only mockup. Mobile responsiveness will be implemented when the website goes live. 
          Please visit this link on your desktop or laptop computer to explore the full interactive experience.
        </Message>
      </NoticeCard>
    </MobileNoticeContainer>
  );
};

export default MobileNotice; 