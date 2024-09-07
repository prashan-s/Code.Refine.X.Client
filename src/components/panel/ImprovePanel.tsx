import React, { useEffect, useState } from 'react';
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

import { CodeAnalysisFacade, CodeAnalysisResult, DefaultCodeAnalysisResult } from '@components/codeAnalysis/CodeAnalysisFacade';
import { TextField } from '@mui/material';

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
const [inputCode, setInputCode] = useState('');
const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResult>();
const [debouncedCode, setDebouncedCode] = useState(inputCode);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCode(inputCode);
        }, 500);
    
        return () => {
            clearTimeout(handler);
        };
    }, [inputCode]);
    
    useEffect(() => {
        if (debouncedCode.trim() !== '') {
            const result = CodeAnalysisFacade.analyzeCode(debouncedCode);
            setAnalysisResult(result);
        } else {
            setAnalysisResult(DefaultCodeAnalysisResult);
        }
    }, [debouncedCode]);

    
const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(e.target.value);
};

const handleAnalyzeCode = () => {
    if (inputCode.trim() !== '') {
        const result = CodeAnalysisFacade.analyzeCode(inputCode);
        setAnalysisResult(result);
    } else {
        
    }
};

    return (
        <PanelContainer>
            {/* Overall Score Section */}
            <SectionTitle>Overall Score</SectionTitle>
            <ScoreText>{analysisResult?.finalScore}</ScoreText>

            {/* Progress Bar Section */}
            <ProgressBar>
                <ProgressIndicator score={analysisResult?.finalScore} />
            </ProgressBar>

            {/* Insights Section */}
            <SectionTitle>Insights</SectionTitle>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>

            <InsightItem>
                <span>Conditions</span>
                <span>{analysisResult?.metrics.conditionals}</span>
                {/* <CircularProgressWithLabel variant="determinate" value={23} /> */}
            </InsightItem>
            <InsightItem>
                <span>Nested Loops</span>
                <span>{analysisResult?.metrics.nestedLoopCount}</span>
                {/* <CircularProgressWithLabel variant="determinate" value={100} /> */}
            </InsightItem>

            {/* Divider */}
            <Divider />

            {/* Advanced Section */}
            <SectionTitle>Advanced</SectionTitle>
            <InsightItem>
                <span>Big O</span>
                <span>{analysisResult?.complexity.bigONotation}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
            </InsightItem>

            {/* Divider */}
            <Divider />

            {/* Suggestions Section */}
            <SectionTitle>Suggestions</SectionTitle>
            <Divider />

            {/* Tools Section */}
            <SectionTitle>Tools</SectionTitle>

            <Divider />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={inputCode} onChange={handleCodeChange} />
           
        </PanelContainer>
    );
};

export default ImprovePanel;









