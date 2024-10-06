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
import PdfDownloadButton from '@components/PdfDownloadButton';

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

    // Generate dynamic HTML content with real values for the PDF download
    const generatePdfContent = () => {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Analysis Report</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body { margin: 0; font-family: 'Roboto', sans-serif; background-color: #f4f6f9; color: #333; }
                .container { display: flex; flex-direction: column; padding: 32px; max-width: 1000px; margin: auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); }
                .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding: 16px 24px; border-bottom: 2px solid #1976d2; }
                .title { font-weight: bold; font-size: 24px; color: #1976d2; }
                .content { display: flex; flex-direction: column; gap: 32px; }
                .section { padding: 24px; background-color: #ffffff; border-radius: 16px; box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05); }
                .section h6 { font-weight: bold; color: #1976d2; margin-bottom: 16px; border-bottom: 1px solid #1976d2; padding-bottom: 8px; }
                .linear-progress { height: 12px; border-radius: 6px; background-color: #e0e0e0; margin-bottom: 8px; }
                .linear-progress-bar { height: 100%; border-radius: 6px; background-color: #1976d2; width: ${analysisResult?.finalScore || 0}%; }
                .insight-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
                .footer { margin-top: 32px; text-align: center; padding: 16px; font-size: 14px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="title">Code Analysis Report</div>
                </div>
                <div class="content">
                    <div class="section">
                        <h6>Overall Score</h6>
                        <div class="linear-progress">
                            <div class="linear-progress-bar"></div>
                        </div>
                        <p style="margin-top: 8px; color: #1976d2; font-weight: bold;">${analysisResult?.finalScore || 'N/A'}</p>
                    </div>
                    <div class="section">
                        <h6>Insights</h6>
                        <div class="insight-item"><span>Language</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.language || 'N/A'}</span></div>
                        <div class="insight-item"><span>Big O Complexity</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.complexity.bigONotation || 'N/A'}</span></div>
                        <div class="insight-item"><span>Loops</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.metrics.loopCount || 'N/A'}</span></div>
                        <div class="insight-item"><span>Conditionals</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.metrics.conditionals || 'N/A'}</span></div>
                        <div class="insight-item"><span>Has Recursions</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.metrics?.hasRecursion ? 'Yes' : 'No'}</span></div>
                        <div class="insight-item"><span>Function Calls</span><span style="font-weight: bold; color: #1976d2;">${analysisResult?.metrics.functionCalls || 'N/A'}</span></div>
                    </div>
                </div>
                <div class="footer">
                    <p>© 2024 CodeRefineX. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    };

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
            <InsightItem>
                <span>Has Recursions</span>
                <span>{analysisResult?.metrics?.hasRecursion ? 'Yes' : 'No'}</span>
            </InsightItem>

            {analysisResult?.metrics?.recursionType !== null && (
                <InsightItem>
                    <span>Recursion Type</span>
                    <span>{analysisResult?.metrics?.recursionType}</span>
                </InsightItem>
            )}

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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '14px', color: '#333' }}>Download Analysis Result</span>
                <PdfDownloadButton htmlContent={generatePdfContent()} fileName="code_analysis_report.pdf" />
            </div>

            <Divider />
            {/* <TextareaAutosize id="outlined-basic" label="Outlined" variant="outlined" value={inputCode} onChange={handleCodeChange} /> */}


        </PanelContainer>
    );
};

export default ImprovePanel;