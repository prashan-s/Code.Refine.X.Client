
export interface MetricsAnalysisResult {
    loopCount: number | 0;
    nestedLoopCount: number | 0;
    hasRecursion: boolean | false;
    recursionType: string | null;
    functionCalls: number | 0;
    conditionals: number | 0;
    dataStructures: number | 0;
}
export class MetricsAnalyzer {
    static analyzeMetrics(code: string): MetricsAnalysisResult {

        const loopCount = this.countLoops(code);
        const nestedLoopCount = this.countNestedLoops(code);
        const functionNames = this.extractFunctionNames(code);
        console.log("XX AllFuntions: \n", functionNames)

        const [hasRecursion, recursionType ] = this.hasRecursion(code, functionNames);
        console.log("XX hasRecursion: \n", hasRecursion)

        const functionCalls = this.countFunctionCalls(code);
        const conditionals = this.countConditionals(code);
        const dataStructures = this.countDataStructures(code);

        return { loopCount, nestedLoopCount, hasRecursion, recursionType, functionCalls, conditionals, dataStructures };
    }

    private static countLoops(code: string): number {
        const forLoops = (code.match(/for\s*\(/g) || []).length;
        const whileLoops = (code.match(/while\s*\(/g) || []).length;
        const doWhileLoops = (code.match(/do\s*\{/g) || []).length;
        return forLoops + whileLoops + doWhileLoops;
    }

    private static countNestedLoops(code: string): number {
        const nestedLoops = (code.match(/(for|while|do)\s*\([^)]*\)\s*\{[^{}]*\{[^{}]*\}[^{}]*\}/g) || []).length;
        return nestedLoops;
    }

    private static extractFunctionNames(code: string): string[] {
        // Remove single-line and multi-line comments
        const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');

        const methodNames: string[] = [];
        const regex = /\b(?:public|private|protected)?\s*\w+\s+(\w+)\s*\([^)]*\)/g;
        let match;

        while ((match = regex.exec(cleanCode)) !== null) {
            methodNames.push(match[1]);
        }

        // Remove duplicates by converting the array to a Set and then back to an array
        return [...new Set(methodNames)];
    }


    public static hasRecursion(code: string, functionNames: string[]): [boolean, string | null] {
        for (const functionName of functionNames) {
            const funcDefRegex = new RegExp(`(public|private|protected)? ?${functionName}.+\\{`, 'g');

            let match: RegExpExecArray | null;
            while ((match = funcDefRegex.exec(code)) !== null) {
                const startIndex = match.index + match[0].length - 1;
                let braceCount = 1;
                let currentIndex = startIndex;
                while (braceCount > 0 && currentIndex < code.length - 1) {
                    currentIndex++;
                    const char = code[currentIndex];
                    if (char === '{') braceCount++;
                    else if (char === '}') braceCount--;
                }
                const functionBody = code.substring(startIndex + 1, currentIndex);
                const callRegex = new RegExp(`\\b(?:this\\.)?${functionName}\\s*\\(`);
                if (callRegex.test(functionBody)) {
                    return [true,"Direct Recursion"]; // Direct recursion detected
                }
            }
        }

        // Build function definitions
        const functionRegex = /(?:public|private|protected)?\s*(\w+)\s*\(.*?\)\s*\{/g;
        const functions: { [name: string]: string } = {};
        let match: RegExpExecArray | null;
        while ((match = functionRegex.exec(code)) !== null) {
            const functionName = match[1];
            const startIndex = match.index + match[0].length - 1;
            let braceCount = 1;
            let currentIndex = startIndex;
            while (braceCount > 0 && currentIndex < code.length - 1) {
                currentIndex++;
                const char = code[currentIndex];
                if (char === '{') braceCount++;
                else if (char === '}') braceCount--;
            }
            const functionBody = code.substring(startIndex + 1, currentIndex);
            functions[functionName] = functionBody;
        }

        return [false,null];; // No indirect recursion detected
    }


    private static countFunctionCalls(code: string): number {
        const functionCalls = (code.match(/\b\w+\s*\(/g) || []).length - this.countLoops(code); // Exclude loop headers
        return functionCalls;
    }

    private static countConditionals(code: string): number {
        const ifStatements = (code.match(/if\s*\(/g) || []).length;
        const elseStatements = (code.match(/else\s*(if)?\s*\{/g) || []).length;
        const switchStatements = (code.match(/switch\s*\(/g) || []).length;
        return ifStatements + elseStatements + switchStatements;
    }

    private static countDataStructures(code: string): number {
        const arrays = (code.match(/\[\]/g) || []).length;
        return arrays;
    }

}