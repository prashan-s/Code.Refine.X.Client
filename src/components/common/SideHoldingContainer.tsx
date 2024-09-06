
import React from 'react';
import styled from 'styled-components';

import { HoldingContainer } from '@styles/HoldingContainer';


interface HoldingContainerProps {
    title?: string;
    selectedComponent: React.ReactNode;
}

const SideHoldingContainerWrapper = styled.div`
  width: 100%;                  /* Takes full width of the parent */
  padding: 50px;
  box-sizing: border-box;        /* Ensure padding doesn't affect width */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;   /* Ensures content inside aligns at the top */
`;

const SideHoldingContainer: React.FC<HoldingContainerProps> = ({ title, selectedComponent }) => {
    return (
        <SideHoldingContainerWrapper>
            <h3>{title}</h3>
            <HoldingContainer>{selectedComponent}</HoldingContainer>
        </SideHoldingContainerWrapper>
    );
};

export default SideHoldingContainer;
