import styled from "styled-components";

export const HomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #f0f2f5; */
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  width: 100%;
  height: 100%;
`;

export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Take full viewport height */
  width: 100%;
  position: relative;
  z-index: 1;
  column-gap: 2rem;
`;

export const ContentContainer = styled.div<{ isCollapsed: boolean }>`
  margin-right: ${(props) => (props.isCollapsed ? "60px" : "600px")};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const ImageContainer = styled.div`
  img {
    max-width: 450px; /* Control image size */
    width: 100%;
    height: auto;
  }
`;

export const Wave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  background: url("/src/assets/footer-wave.svg") no-repeat center;
  /* background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 59.2345C0 59.2345 96.7209 105.041 259.926 105.041C423.131 105.041 558.964 55.7314 676.585 55.7314C794.206 55.7314 900.264 96.9732 1048.53 96.9732C1196.79 96.9732 1200 59.2345 1200 59.2345V121H0V59.2345Z' fill='%23006475'/%3E%3C/svg%3E") no-repeat center; */
  background-size: cover;
`;

// export const Footer = styled.footer`
//   width: 100%;
//   height: 400px;
//   background-color: #39397f;
// `;