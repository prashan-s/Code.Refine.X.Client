
import React from 'react';
import { HoldingContainer, SideHoldingContainerWrapper } from '@styles/HoldingContainer';

interface HoldingContainerProps {
    title?: string;
    selectedComponent: React.ReactNode;
}

const SideHoldingContainer: React.FC<HoldingContainerProps> = (props) => {
    return (
        <SideHoldingContainerWrapper>
            <h3>{props.title}</h3>
            <HoldingContainer>{props.selectedComponent}</HoldingContainer>
        </SideHoldingContainerWrapper>
    );
};

export default SideHoldingContainer;
