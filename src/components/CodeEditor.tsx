import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco, OnChange, OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import { setEditorCode } from '@redux/reducers/monacoReducer';
import * as monaco from 'monaco-editor';
import { debounce } from 'lodash';
import axiosInstance from '@utils/axiosInstance';
import { showToast } from '@utils/toastService';
import useSessionStorage from "@hooks/useSessionStorage";

interface CodeEditorProps {
    height?: string;
    width?: string;
    selectedHistory?: { code: string }; // Add optional prop for selected CodeHistory
}

const CodeEditor: React.FC<CodeEditorProps> = ({ height = '90vh', width = '90vw', selectedHistory }) => {
    const monacoInstance = useMonaco();
    const dispatch = useDispatch();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const [showPopup, setShowPopup] = useState(false);
    const [editorReloaded, seteditorReloaded] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [selectedCode, setSelectedCode] = useState('');
    const [isSugessionViewOpen, setSugessionViewOpen] = useState(false);
    const [isSnippetViewOpen, setSnippetViewOpen] = useState(false);
    const [isGistShareViewOpen, setGistShareViewOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [snippetTitle, setSnippetTitle] = useState('');
    const [storedUserId,] = useSessionStorage("userId", null);

    const [, setSyntaxErrors] = useState<
        { message: string; startLine: number; startColumn: number; endLine: number; endColumn: number }[]
    >([]);

    // Load dummy suggestions
    const loadDummySuggestions = () => {
        console.log('XX :>> loadDummySuggestions ');
        setSuggestions([
            'Suggestion 1: Add a class',
            'Suggestion 2: Use better variable names',
            'Suggestion 3: Add comments for clarity',
            'Suggestion 4: Refactor the method',
            'Suggestion 5: Simplify the logic',
        ]);
    };

    const gistShare = (userID: number, code: string) => {
        const gistData = {
            userID: userID,
            snippetContent: code,
        };
        console.log('call to gistShare method', gistData);

    };
    const addSnippet = (userID: number, title: string, code: string) => {
        const snippetData = {
            userID: userID,
            snippetTitle: title,
            snippetContent: code,
            language: 'java'
        };
        console.log('call to add Snippet');

        axiosInstance.post('/snippets', snippetData)
            .then((response) => {
                console.log('Snippet saved successfully:', response.data);
                showToast('success', 'Success', 'Snippet saved successfully');
            })
            .catch((error) => {
                console.error('Error saving snippet:', error);
                showToast('error', 'Error', 'Failed to save the snippet');
            });
    };


    // Configuring Monaco for Java
    useEffect(() => {
        if (monacoInstance) {
            // Register Java language in Monaco Editor
            monacoInstance.languages.register({ id: 'java' });

            // Set tokenization and highlighting for Java
            monacoInstance.languages.setMonarchTokensProvider('java', {
                tokenizer: {
                    root: [
                        [/\b(public|private|protected)\b/, 'keyword'],
                        [/\b(class|void|int|float|boolean|double|new)\b/, 'keyword'],
                        [/[{}]/, 'delimiter.bracket'],
                        [/[()\\[\]]/, 'delimiter.parenthesis'],
                        [/".*?"/, 'string'],
                        [/'.*?'/, 'string'],
                        [/\/\/.*$/, 'comment'],
                        [/\/\*[\s\S]*?\*\//, 'comment'],
                        [/[a-z_$][\w$]*/, 'identifier'],
                    ],
                },
            });

            monacoInstance.languages.registerCompletionItemProvider('java', {
                provideCompletionItems: () => {
                    const range = {
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: 1,
                        endColumn: 1,
                    };
                    return {
                        suggestions: [
                            {
                                label: 'System.out.println',
                                kind: monacoInstance.languages.CompletionItemKind.Function,
                                insertText: 'System.out.println();',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range,
                            },
                            {
                                label: 'main',
                                kind: monacoInstance.languages.CompletionItemKind.Snippet,
                                insertText: [
                                    'public static void main(String[] args) {',
                                    '\tSystem.out.println("Hello World!");',
                                    '}',
                                ].join('\n'),
                                insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range,
                            },
                        ],
                    };
                },
            });

            // Enable syntax validation
            const models = monacoInstance.editor.getModels();
            if (models.length > 0) {
                monacoInstance.editor.setModelLanguage(models[0], 'java');
            }
        }
    }, [monacoInstance]);

    // Handle selection in the editor
    useEffect(() => {
        console.log('XX :>>useEffect ', editorRef.current == null);
        if (!editorRef.current) return;
        const editor = editorRef.current;

        const handleSelectionChange = debounce(() => {
            const selection = editor.getSelection();
            if (selection && !selection.isEmpty()) {
                const selectedText = editor?.getModel()?.getValueInRange(selection); // Use optional chaining
                if (selectedText?.trim()) {  // Check if selectedText is not empty
                    setSelectedCode(selectedText);  // Store the selected code in state

                    const domNode = editor.getDomNode();
                    if (domNode) {
                        const position = editor.getScrolledVisiblePosition(selection.getPosition());
                        if (position) {
                            const adjustedTop = Math.min(position.top, domNode.clientHeight - 100);
                            const adjustedLeft = Math.min(position.left, domNode.clientWidth - 200);
                            setPopupPosition({ top: adjustedTop, left: adjustedLeft });
                            setShowPopup(true);  // Show pop-up only when valid text is selected
                        }
                    }
                }
            } else {
                // Hide pop-up if no text is selected
                setShowPopup(false);
            }
        }, 1000);

        const disposable = editor.onDidChangeCursorSelection(handleSelectionChange);

        return () => {
            disposable.dispose();
            handleSelectionChange.cancel();
            console.log('XX :>> ');
        };
    }, [editorReloaded]);


    // Handle editor mount
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        seteditorReloaded(!editorReloaded);
        dispatch(setEditorCode(editor.getValue()));

        // If there's a selected history passed in props, set it in the editor
        if (selectedHistory && selectedHistory.code) {
            editor.setValue(selectedHistory.code);
        }
    };

    // Handle code changes in the editor
    const handleEditorChange: OnChange = (value) => {

        if (value) {
            console.log('XX :>> ', value);
            validateJavaCode(value);
            dispatch(setEditorCode(value));
        }
    };

    // Validate Java code syntax and set markers
    const validateJavaCode = (code: string) => {
        const errors = [];
        const lines = code.split('\n');
        let openBraces = 0;
        let openParentheses = 0;
        let isCodeUnreachable = false;
        const methodNames: Set<string> = new Set();
        const ifElseStack: string[] = [];
        let insideStringLiteral = false;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*') || trimmedLine.startsWith('*/')) {
                return;
            }

            const methodDeclarationRegex = /\b(public|private|protected)?\s*(static)?\s*\w+\s+\w+\s*\(.*\)\s*\{/;
            const methodMatch = methodDeclarationRegex.exec(trimmedLine);
            if (methodMatch) {
                const methodName = trimmedLine.split('(')[0].split(' ').pop() || '';
                if (methodNames.has(methodName)) {
                    errors.push({
                        message: `Duplicate method "${methodName}" declaration`,
                        startLine: index + 1,
                        startColumn: 1,
                        endLine: index + 1,
                        endColumn: trimmedLine.length,
                    });
                } else {
                    methodNames.add(methodName);
                }
            }

            if (trimmedLine.includes('{')) openBraces++;
            if (trimmedLine.includes('}')) openBraces--;

            if (openBraces < 0) {
                errors.push({
                    message: 'Unmatched closing brace',
                    startLine: index + 1,
                    startColumn: trimmedLine.indexOf('}') + 1,
                    endLine: index + 1,
                    endColumn: trimmedLine.indexOf('}') + 2,
                });
                openBraces = 0;
            }

            if (trimmedLine.includes('(')) openParentheses++;
            if (trimmedLine.includes(')')) openParentheses--;

            if (openParentheses < 0) {
                errors.push({
                    message: 'Unmatched closing parenthesis',
                    startLine: index + 1,
                    startColumn: trimmedLine.indexOf(')') + 1,
                    endLine: index + 1,
                    endColumn: trimmedLine.indexOf(')') + 2,
                });
                openParentheses = 0;
            }

            if (isCodeUnreachable && trimmedLine.length > 0) {
                errors.push({
                    message: 'Unreachable code detected',
                    startLine: index + 1,
                    startColumn: 1,
                    endLine: index + 1,
                    endColumn: trimmedLine.length,
                });
                isCodeUnreachable = false;
            }

            if (trimmedLine.startsWith('return') || trimmedLine.startsWith('break') || trimmedLine.startsWith('continue')) {
                isCodeUnreachable = true;
            }

            if (
                !trimmedLine.endsWith(';') &&
                !trimmedLine.endsWith('{') &&
                !trimmedLine.endsWith('}') &&
                trimmedLine !== '' &&
                !trimmedLine.startsWith('if') &&
                !trimmedLine.startsWith('while') &&
                !trimmedLine.startsWith('for') &&
                !trimmedLine.includes('//')
            ) {
                errors.push({
                    message: 'Missing semicolon',
                    startLine: index + 1,
                    startColumn: line.length,
                    endLine: index + 1,
                    endColumn: line.length + 1,
                });
            }

            if (trimmedLine.startsWith('if') && trimmedLine.includes('{')) {
                ifElseStack.push('if');
            } else if (trimmedLine.startsWith('else') && trimmedLine.includes('{')) {
                if (ifElseStack.length === 0) {
                    errors.push({
                        message: 'Unmatched "else" without corresponding "if"',
                        startLine: index + 1,
                        startColumn: 1,
                        endLine: index + 1,
                        endColumn: trimmedLine.length,
                    });
                } else {
                    ifElseStack.pop();
                }
            }

            const quoteCount = (trimmedLine.match(/"/g) || []).length;
            if (quoteCount % 2 !== 0) {
                if (insideStringLiteral) {
                    insideStringLiteral = false;
                } else {
                    insideStringLiteral = true;
                    errors.push({
                        message: 'Unclosed string literal',
                        startLine: index + 1,
                        startColumn: trimmedLine.indexOf('"') + 1,
                        endLine: index + 1,
                        endColumn: trimmedLine.length,
                    });
                }
            }

            const variableDeclarationRegex = /\b(int|float|double|boolean|char|String)\b\s+\w+(\s*,\s*\w+)+/;
            if (variableDeclarationRegex.test(trimmedLine)) {
                errors.push({
                    message: 'Multiple variable declarations on a single line',
                    startLine: index + 1,
                    startColumn: 1,
                    endLine: index + 1,
                    endColumn: trimmedLine.length,
                });
            }
        });

        if (openBraces > 0) {
            errors.push({
                message: 'Unmatched opening brace',
                startLine: lines.length,
                startColumn: 1,
                endLine: lines.length,
                endColumn: 1,
            });
        }

        if (openParentheses > 0) {
            errors.push({
                message: 'Unmatched opening parenthesis',
                startLine: lines.length,
                startColumn: 1,
                endLine: lines.length,
                endColumn: 1,
            });
        }

        if (ifElseStack.length > 0) {
            errors.push({
                message: 'Unmatched "if" without corresponding "else"',
                startLine: lines.length,
                startColumn: 1,
                endLine: lines.length,
                endColumn: 1,
            });
        }

        setSyntaxErrors(errors);
        markErrorsInEditor(errors);
    };

    // Mark errors in Monaco Editor based on the provided error data
    const markErrorsInEditor = (errors: { message: string; startLine: number; startColumn: number; endLine: number; endColumn: number }[]) => {
        const markers = errors.map((error) => ({
            startLineNumber: error.startLine,
            startColumn: error.startColumn,
            endLineNumber: error.endLine,
            endColumn: error.endColumn,
            message: error.message,
            severity: monaco?.MarkerSeverity.Error,
        }));

        if (editorRef.current) {
            monaco?.editor.setModelMarkers(editorRef.current.getModel()!, 'owner', markers);
        }
    };

    return (
        <div style={{ position: 'relative', height, width, border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
            <Editor
                height="100%"
                defaultLanguage="java"
                defaultValue={`// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    theme: 'vs-light',
                    minimap: { enabled: false },
                    lineNumbers: 'on',
                    automaticLayout: true,
                    wordWrap: 'on',
                    formatOnType: true,
                    formatOnPaste: true,
                }}
            />

            {/* Pop-up for "Get Suggestion" and "Add Snippet" Buttons */}
            {showPopup && selectedCode && (
                <div
                    style={{
                        position: 'fixed',
                        top: popupPosition.top,
                        left: popupPosition.left,
                        backgroundColor: '#ffffff',
                        border: '1px solid #e0e0e0',
                        padding: '12px',
                        zIndex: 10000,
                        borderRadius: '12px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <button
                        style={{
                            background: 'linear-gradient(135deg, #76c7c0, #42a5f5)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.3s, transform 0.2s',
                            marginBottom: '8px',
                            width: '100%',
                        }}
                        // onClick={loadDummySuggestions}
                        onClick={() => { loadDummySuggestions(); setSugessionViewOpen(true); setSnippetViewOpen(false); setGistShareViewOpen(false) }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Get Suggestions
                    </button>
                    <button
                        style={{
                            background: 'linear-gradient(135deg, #76c7c0, #42a5f5)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.3s, transform 0.2s',
                            width: '100%',
                        }}
                        onClick={() => { setSugessionViewOpen(false); setSnippetViewOpen(true); setSugessionViewOpen(false) }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Add Snippet
                    </button>
                    <button
                        style={{
                            background: 'linear-gradient(135deg, #76c7c0, #42a5f5)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.3s, transform 0.2s',
                            width: '100%',
                        }}
                        onClick={() => { setSugessionViewOpen(false); setSnippetViewOpen(false); setGistShareViewOpen(true) }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Share to GIST
                    </button>

                    {/* Display Suggestions */}
                    {suggestions.length > 0 && !isSnippetViewOpen && !isGistShareViewOpen && (
                        <ul style={{ listStyleType: 'none', padding: '12px 0', margin: 0 }}>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} style={{ padding: '6px 0', fontSize: '14px', color: '#616161' }}>{suggestion}</li>
                            ))}
                        </ul>
                    )}
                    {/* Display Snippets */}
                    {isSnippetViewOpen && !isSugessionViewOpen && !isGistShareViewOpen && (
                        <div style={{ padding: '12px 0' }}>
                            <label htmlFor="snippet-title" style={{ fontSize: '14px', color: '#424242', padding: '6px 0' }}>Enter Snippet Title:</label>
                            <input
                                type="text"
                                id="snippet-title"
                                style={{
                                    padding: '8px',
                                    margin: '8px 0',
                                    fontSize: '14px',
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '1px solid #bdbdbd',
                                    color: '#000', // Ensuring the text color is visible (black)
                                    backgroundColor: '#fff', // Ensuring background is white (or any desired color)
                                }}
                                placeholder="Snippet Title"
                                value={snippetTitle}
                                onChange={(e) => setSnippetTitle(e.target.value)}
                            />

                            <button
                                onClick={() => addSnippet(storedUserId, snippetTitle, selectedCode)}
                                style={{
                                    padding: '10px 16px',
                                    marginTop: '8px',
                                    fontSize: '14px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #76c7c0, #42a5f5)',
                                    color: '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s, transform 0.2s',
                                    width: '100%',
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Save
                            </button>
                        </div>
                    )}
                    {/* Display gist share */}
                    {isGistShareViewOpen && !isSugessionViewOpen && !isSnippetViewOpen && (
                        <div style={{ padding: '12px 0' }}>
                            <label htmlFor="snippet-title" style={{ fontSize: '14px', color: '#424242', padding: '6px 0' }}>Share gist</label>

                            <button
                                onClick={() => gistShare(storedUserId, selectedCode)}
                                style={{
                                    padding: '10px 16px',
                                    marginTop: '8px',
                                    fontSize: '14px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #76c7c0, #42a5f5)',
                                    color: '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s, transform 0.2s',
                                    width: '100%',
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Share
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CodeEditor;