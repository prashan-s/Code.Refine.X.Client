export interface MetricsAnalysisResult {
    loopCount: number;
    nestedLoopCount: number;
    hasRecursion: boolean;
    functionCalls: number;
    conditionals: number;
    dataStructures: number;
}
export class MetricsAnalyzer {
    static analyzeMetrics(code: string): MetricsAnalysisResult {

        const loopCount = this.countLoops(code);
        const nestedLoopCount = this.countNestedLoops(code);
        const functionNames = this.extractFunctionNames(code);
        const hasRecursion = this.checkForRecursion(code, functionNames);
        const functionCalls = this.countFunctionCalls(code);
        const conditionals = this.countConditionals(code);
        const dataStructures = this.countDataStructures(code);

        return { loopCount, nestedLoopCount, hasRecursion, functionCalls, conditionals, dataStructures };
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
        const methodNames: string[] = [];
        const regex = /\b(?:public|private|protected)?\s*\w+\s+(\w+)\s*\([^)]*\)\s*\{/g;
        let match;
        while ((match = regex.exec(code)) !== null) {
            methodNames.push(match[1]);
        }
        return methodNames;
    }

    private static checkForRecursion(code: string, functionNames: string[]): boolean {
        for (const functionName of functionNames) {

            const recursionPattern = new RegExp(`\\b${functionName}\\s*\\(`, 'g');
            if (recursionPattern.test(code)) {
                return true;
            }
        }
        return false;
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