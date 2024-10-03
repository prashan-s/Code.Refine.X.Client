import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco, OnChange, OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import { setEditorCode } from '@redux/reducers/monacoReducer';
import * as monaco from 'monaco-editor';

const CodeEditor: React.FC = () => {
    const monacoInstance = useMonaco();
    const dispatch = useDispatch();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    // State to track syntax errors
    const [, setSyntaxErrors] = useState<
        { message: string; startLine: number; startColumn: number; endLine: number; endColumn: number }[]
    >([]);

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
                        [/[()\[\]]/, 'delimiter.parenthesis'],
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
            monacoInstance.editor.setModelLanguage(monacoInstance.editor.getModels()[0], 'java');
        }
    }, [monacoInstance]);

    // Handle code changes in the editor
    const handleEditorChange: OnChange = (value) => {
        console.log('Current code:', value);
        if (value) {
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
        const methodNames: Set<string> = new Set(); // To track unique method names
        let ifElseStack: string[] = [];
        let insideStringLiteral = false;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            // Skip comments
            if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*') || trimmedLine.startsWith('*/')) {
                return;
            }

            // Detect method declarations and check for duplicates
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

            // Check for unmatched braces
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

            // Check for unmatched parentheses
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

            // Check for unreachable code
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

            // Check for missing semicolons
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

            // Check for incomplete if-else blocks
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

            // Check for unclosed string literals
            const quoteCount = (trimmedLine.match(/"/g) || []).length;
            if (quoteCount % 2 !== 0) {
                if (insideStringLiteral) {
                    insideStringLiteral = false; // Closed the string
                } else {
                    insideStringLiteral = true; // Opened the string
                    errors.push({
                        message: 'Unclosed string literal',
                        startLine: index + 1,
                        startColumn: trimmedLine.indexOf('"') + 1,
                        endLine: index + 1,
                        endColumn: trimmedLine.length,
                    });
                }
            }

            // Detect multiple variable declarations on a single line
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

        // If there are unclosed braces or parentheses, raise errors
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

        // Update the state to reflect the errors
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

    // Save reference to the editor instance on mount
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        const currentCode = editor.getValue(); // Get the current editor content
        dispatch(setEditorCode(currentCode)); // Dispatch the initial code to Redux
    };

    return (
        <div style={{ height: '90vh', width: '90vw', border: '1px solid #ddd' }}>
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
        </div>
    );
};

export default CodeEditor;