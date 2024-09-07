import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  display: grid;
  grid-template-columns: ${({ isCollapsed }) => (isCollapsed ? '0' : '300px')} ${({ isCollapsed }) => (isCollapsed ? '0' : '300px')};
  transition: grid-template-columns 0.3s ease-in-out;
  height: 100vh;
  color: #000;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  row-gap: 1em;
  z-index: 1000;
`;

export const CollapsedSidebar = styled.div`  /* New styled component for collapsed sidebar */
  position: fixed;
  top: 0;
  right: 0;
  width: 60px; /* Stripe width */
  height: 100vh;
  row-gap: 1em;
  padding-top: 1em;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;  /* Ensure it stays on top */
`;

export const LeftPanel = styled.div`
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  position: relative;
  border-right: 1px solid #e8e8e8;
  border-radius: 15px 0 0 15px;
`;

export const RightPanel = styled.div`
  padding: 20px 0 20px 20px;
  background-color: #fff;
`;

export const HideButton = styled.button<{ isCollapsed: boolean }>`
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 1em; 
  top: 2em;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
`;

export const Heading = styled.h1`
  margin-bottom: 0px;
  text-align: left;
`;

export const HorizontalLine = styled.hr`  /* New horizontal line */
  width: 100%;
  border: none;
  border-top: 1px solid #e8e8e8;  /* Line color */
  padding-right: 20px;
  margin-bottom: 5px;  /* Space below the line */
`;

export const NavItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  column-gap: 10px;
  padding: 10px;
  border-radius: 8px 0 0 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#424242' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#424242' : '#e0e0e0')};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;