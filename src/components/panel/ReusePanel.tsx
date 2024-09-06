import React from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel'; // Assuming the styles are imported

const ReusePanel: React.FC = () => {
    return (
        <PanelContainer>
            {/* Overall Score Section */}
            <SectionTitle>Overall Score</SectionTitle>
            {/* Divider */}
            <Divider />
        </PanelContainer>
    );
};

export default ReusePanel;
