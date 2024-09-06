import styled from "styled-components";

export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Take full viewport height */
  background-color: #f0f2f5; 
  width: 100%;
`;

export const ContentContainer = styled.div<{ isCollapsed: boolean }>`
  margin-right: ${(props) => (props.isCollapsed ? "60px" : "600px")};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;