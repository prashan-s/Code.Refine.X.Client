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
    InsightItem,
    SuggestionItem
} from '@styles/Improve.Panel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { CodeAnalysisFacade, CodeAnalysisResult, DefaultCodeAnalysisResult } from '@components/codeAnalysis/CodeAnalysisFacade';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import axios from 'axios';

// function CircularProgressWithLabel(
//     props: CircularProgressProps & { value: number },
// ) {
//     return (
//         <Box sx={{ position: 'relative', display: 'inline-flex' }}>
//             <CircularProgress variant="determinate" {...props} />
//             <Box
//                 sx={{
//                     top: 0,
//                     left: 0,
//                     bottom: 0,
//                     right: 0,
//                     position: 'absolute',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Typography
//                     variant="caption"
//                     component="div"
//                     sx={{ color: 'text.secondary' }}
//                 >{`${Math.round(props.value)}%`}</Typography>
//             </Box>
//         </Box>
//     );
// }

const ImprovePanel: React.FC = () => {

    const editorCode = useSelector((state: RootState) => state.monaco.editorCode);

    const [inputCode, setInputCode] = useState('');
    const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResult>();
    const [debouncedCode, setDebouncedCode] = useState(inputCode);
    const [suggestions, setSuggestions] = useState<string[]>([]); // To store GitHub suggestions
    const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (editorCode.trim() !== '') {
                fetchGitHubSuggestions(editorCode);
            }
            setDebouncedCode(editorCode);
            setInputCode(editorCode);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [editorCode]);

    useEffect(() => {
        if (debouncedCode.trim() !== '') {
            const result = CodeAnalysisFacade.analyzeCode(debouncedCode);
            setAnalysisResult(result);
        } else {
            setAnalysisResult(DefaultCodeAnalysisResult);
        }
    }, [debouncedCode]);


    // const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setInputCode(e.target.value);
    // };

    // const handleAnalyzeCode = () => {
    //     if (inputCode.trim() !== '') {
    //         const result = CodeAnalysisFacade.analyzeCode(inputCode);
    //         setAnalysisResult(result);
    //     } else {

    //     }
    // };

    const fetchGitHubSuggestions = async (code: string) => {
        try {
            setLoadingSuggestions(true); // Set loading state to true
            const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
            const query = encodeURIComponent(code.slice(0, 100)); // Send only the first 100 characters for performance
            const response = await axios.get(
                `https://api.github.com/search/code?q=${query}+in:file+language:java`,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${GITHUB_TOKEN}`, // Replace with your GitHub token
                    },
                }
            );
            const suggestions = response.data.items.map((item: any) => item.html_url); // Map results to URLs
            setSuggestions(suggestions); // Update the suggestions

            // After getting the suggestions, call the API to insert them into your system
            await sendSuggestionsToAPI(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]); // Clear suggestions on error
        } finally {
            setLoadingSuggestions(false); // Set loading state to false
        }
    };

    const sendSuggestionsToAPI = async (suggestions: string[]) => {
        try {
            const BASE_URL = process.env.API_URL;
            const API_URL = `${BASE_URL}/suggestions`; // Replace with your actual API endpoint
            const userId = 5; // Hardcode User ID as 5

            if (suggestions.length > 0) {
                const firstSuggestion = suggestions[0]; // Take the first suggestion

                const suggesstionDto = {
                    userID: userId,
                    suggesstionContent: firstSuggestion,
                };

                await axios.post(API_URL, suggesstionDto); // Post the first suggestion to your API
                console.log('First suggestion sent to API successfully');
            } else {
                console.log('No suggestions to send');
            }
        } catch (error) {
            console.error('Error sending suggestions to API:', error);
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
                <span>Language</span>
                <span>{analysisResult?.language}</span>
            </InsightItem>
            <InsightItem>
                <span>Big O</span>
                <span>{analysisResult?.complexity.bigONotation}</span>
            </InsightItem>
            <InsightItem>
                <span>Loops</span>
                <span>{analysisResult?.metrics.loopCount}</span>
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
                <span> Nested Loops</span>
                <span>{analysisResult?.metrics.nestedLoopCount}</span>
            </InsightItem>
            <InsightItem>
                <span>Conditionals</span>
                <span>{analysisResult?.metrics.conditionals}</span>
            </InsightItem>
            {/* <InsightItem>
                <span>Has Recursions</span>
                <span>{analysisResult?.metrics?.hasRecursion ? 'Yes' : 'No'}</span>
            </InsightItem> */}

            <InsightItem>
                <span>Function Calls</span>
                <span>{analysisResult?.metrics.functionCalls}</span>
            </InsightItem>
            <InsightItem>
                <span>Array Count</span>
                <span>{analysisResult?.metrics.dataStructures}</span>
            </InsightItem>

            {/* Divider */}
            <Divider />

            {/* Tools Section */}
            <SectionTitle>Errors</SectionTitle>
            {true ? (
                <ul>
                    {analysisResult?.syntax.errors.map((error, index) => (
                        <li key={index}>{`Error ${index + 1}: ${error}`}</li>
                    ))}
                </ul>
            ) : (
                <p>No errors found</p>
            )}
            <Divider />
            {/* <TextareaAutosize id="outlined-basic" label="Outlined" variant="outlined" value={inputCode} onChange={handleCodeChange} /> */}

            {/* Suggestions Section */}
            <SectionTitle>Suggestions</SectionTitle>
            {loadingSuggestions ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                suggestions.length > 0 ? (
                    <ul style={{ padding: 0 }}>
                        {suggestions.map((suggestion, index) => (
                            <SuggestionItem key={index}>
                                <a href={suggestion} target="_blank" rel="noopener noreferrer">
                                    {suggestion}
                                </a>
                            </SuggestionItem>
                        ))}
                    </ul>
                ) : (
                    <p>No suggestions found</p>
                )
            )}
            <Divider />
        </PanelContainer>
    );
};

export default ImprovePanel;