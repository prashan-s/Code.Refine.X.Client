import styled from "styled-components";

export const HomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  width: 100%;
  height: 100%;
`;

export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  gap: 2rem;
`;

export const ContentContainer = styled.div<{ isCollapsed: boolean }>`
  margin-right: ${(props) => (props.isCollapsed ? "60px" : "600px")};
  transition: margin-right 0.3s ease;
  padding: 20px;
  background-color: white;
  width: 100%;
`;

export const ImageContainer = styled.div`
  img {
    max-width: 450px;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease-in-out;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Wave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  background: url("/src/assets/footer-wave.svg") no-repeat center;
  background-size: cover;
`;

export const HeroSectionContainer = styled.div`
  position: relative;
  padding-top: 9rem;
  text-align: center;

  h1 {
    font-weight: bold;
    color: #1f2937;
    font-size: 3.5rem;
    @media (min-width: 768px) {
      font-size: 4rem;
    }
    @media (min-width: 1280px) {
      font-size: 5rem;
    }
    span {
      color: #3b82f6;
    }
  }

  p {
    margin-top: 2rem;
    color: #6b7280;
  }
`;

export const HeroButton = styled.button`
  height: 2.75rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: #2563eb;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;
