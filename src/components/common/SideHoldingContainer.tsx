
import React from 'react';
import styled from 'styled-components';

import { HoldingContainer, SideHoldingContainerWrapper } from '@styles/HoldingContainer';


interface HoldingContainerProps {
    title?: string;
    selectedComponent: React.ReactNode;
}



const SideHoldingContainer: React.FC<HoldingContainerProps> = ({ title, selectedComponent }) => {
    return (
        <SideHoldingContainerWrapper>
            <h3>{title}</h3>
            <HoldingContainer>{selectedComponent}</HoldingContainer>
        </SideHoldingContainerWrapper>
    );
};

export default SideHoldingContainer;
