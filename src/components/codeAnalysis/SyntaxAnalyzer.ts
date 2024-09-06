export interface SyntaxAnalysisResult {
    errors: string[];
}

export class SyntaxAnalyzer {
    static analyzeSyntax(code: string): SyntaxAnalysisResult {
        let errors: string[] = [];

        const lines = code.split('\n');
        const semicolonRequiredPatterns = /^(int|float|double|String|char|boolean|byte|short|long|System\.out\.println|return|[a-zA-Z_]\w*\.[a-zA-Z_]\w*)\s*[^{}]*$/;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // If the line matches a pattern where a semicolon is required, check if it ends with a semicolon
            if (semicolonRequiredPatterns.test(line) && !line.endsWith(';')) {
                errors.push(`Missing semicolon at line ${i + 1}`);
            }
        }

        // Check for {} mismatches
        const openingBraces = (code.match(/{/g) || []).length;
        const closingBraces = (code.match(/}/g) || []).length;
        if (openingBraces !== closingBraces) errors.push('Brace mismatch');

        // Check for () mismatches
        const openingParentheses = (code.match(/\(/g) || []).length;
        const closingParentheses = (code.match(/\)/g) || []).length;
        if (openingParentheses !== closingParentheses) errors.push('Parentheses mismatch');

        // Check for unclosed "" s
        const unclosedStringLiterals = (code.match(/"/g) || []).length % 2 !== 0;
        if (unclosedStringLiterals) errors.push('Unclosed string literal');

        // Check some Java keywords (optional)
        if (code.includes('public') && !code.includes('class')) {
            errors.push('Possible missing class after public keyword');
        }

        return { errors };
    }
}
