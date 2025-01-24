import styled from "styled-components";

export const SpinnerOverlay = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  /* background-color: rgba(255, 255, 255, 0.1); // Light gray background */
  background:rgba(255,255,255, 0.3);
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: center;
`;