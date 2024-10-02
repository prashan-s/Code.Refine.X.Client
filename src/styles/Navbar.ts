import { Link } from 'react-router-dom'; // Assuming React Router is being used for navigation
import styled from 'styled-components';

// Styled component for Navbar
export const NavbarContainer = styled.nav`
  position: fixed;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* White background */
  color: black; /* Black font color */
  padding: 1rem 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow for navbar */

  &:hover {
    cursor: pointer;
  }
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  background: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    color: #007bff; /* Change to blue on hover */
    cursor: pointer;
  }
`;