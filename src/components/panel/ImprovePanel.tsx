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
    InsightItem
} from '@styles/Improve.Panel';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

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
                <CircularProgressWithLabel variant="determinate" value={44} />
            </InsightItem>
            <InsightItem>
                <span>Conditions</span>
                <CircularProgressWithLabel variant="determinate" value={23} />
            </InsightItem>
            <InsightItem>
                <span>Nested Loops</span>
                <CircularProgressWithLabel variant="determinate" value={100} />
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
