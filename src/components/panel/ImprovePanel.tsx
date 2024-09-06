import React from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';
import {
    ScoreText,
    ProgressBar,
    ProgressIndicator,
    ProgressLabel,
    InsightItem,
    ProgressCircle
} from '@styles/Improve.Panel';


const ImprovePanel: React.FC = () => {
    return (
        <PanelContainer>
            {/* Overall Score Section */}
            <SectionTitle>Overall Score</SectionTitle>
            <ScoreText>3.9</ScoreText>

            {/* Progress Bar Section */}
            <ProgressBar>
                <ProgressLabel>0</ProgressLabel>
                <ProgressIndicator score={0} />
                <ProgressLabel>100</ProgressLabel>
            </ProgressBar>

            {/* Insights Section */}
            <SectionTitle>Insights</SectionTitle>
            <InsightItem>
                <span>Loops</span>
                <ProgressCircle>99%</ProgressCircle>
            </InsightItem>
            <InsightItem>
                <span>Conditions</span>
                <ProgressCircle>99%</ProgressCircle>
            </InsightItem>
            <InsightItem>
                <span>Nested Loops</span>
                <ProgressCircle>99%</ProgressCircle>
            </InsightItem>

            {/* Divider */}
            <Divider />

            {/* Advanced Section */}
            <SectionTitle>Advanced</SectionTitle>
            <InsightItem>
                <span>Loops</span>
                <span>1 / 10</span>
            </InsightItem>
            <InsightItem>
                <span>Big O</span>
                <span>n</span>
            </InsightItem>

            {/* Divider */}
            <Divider />

            {/* Suggestions Section */}
            <SectionTitle>Suggestions</SectionTitle>
            <Divider />

            {/* Tools Section */}
            <SectionTitle>Tools</SectionTitle>

            <Divider />
        </PanelContainer>
    );
};

export default ImprovePanel;
