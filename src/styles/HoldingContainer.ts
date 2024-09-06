import styled from 'styled-components';

export const HoldingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  /* Aligns items to the top */
  align-items: stretch;         /* Makes children take full width of the parent */
  height: 100vh;                /* Full height for the parent */
  padding: 16px;      
`;