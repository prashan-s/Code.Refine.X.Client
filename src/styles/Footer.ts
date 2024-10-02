import styled from 'styled-components';

// Container for the footer
export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #39397f;
  color: white;
  padding: 2rem;
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 1;
`;

export const FooterRow = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  padding-bottom: 1rem;
`;

// Section for each footer column
export const FooterSection = styled.div`
  flex: 1;
  padding: 1rem;
`;

// Title for each section with an underline
export const FooterTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 2rem;
  position: relative;
`;

// Underline for the FooterTitle
export const FooterTitleUnderline = styled.span`
  display: block;
  width: 20px;
  height: 3px;
  background-color: #ff7210;
  margin-top: 5px;
  position: absolute;
  left: 0;
`;

// Horizontal line
export const HorizontalLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: white;
  opacity: 0.2;
  border: none;
  margin: 1rem 0;
`;

// Copyright section
export const CopyrightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding-top: 1rem;
  font-size: 14px;
  color: hsla(0,0%,100%,.639);
  p {
    margin: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

// Text for footer information or description
export const FooterInfo = styled.p`
  line-height: 1.6;
  font-size: 14px;
`;

// Hyperlinks in the footer
export const FooterLink = styled.a`
  color: hsla(0,0%,100%,.639);
  display: block;
  margin: 0.5rem 0;
  text-decoration: none;
  &:hover {
    color: #f0f0f0;
    text-decoration: underline;
  }
`;

// Social icons container
export const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

// Social icons (LinkedIn, GitHub, etc.)
export const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s ease;
  &:hover {
    color: #f0f0f0;
  }
`;

// Contact information
export const ContactInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: hsla(0,0%,100%,.639);
  display: flex;
  align-items: center;
`;
