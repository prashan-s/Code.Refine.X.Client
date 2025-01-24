import { SyntaxAnalysisResult } from "./SyntaxAnalyzer";
import { MetricsAnalysisResult } from "./MetricsAnalyzer";
import { ComplexityResult } from "./ComplexityAnalyzer";

export class QualityAssessor {

    // Map Big O notations to numerical values
    private static getBigONotationValue(bigONotation: string): number {
        switch (bigONotation) {
            case "O(1)":
                return 1;
            case "O(log n)":
                return 2;
            case "O(n)":
                return 3;
            case "O(n log n)":
                return 4;
            case "O(n^2)":
                return 5;
            case "O(2^n)":
                return 6;
            case "O(n!)":
                return 7;
            default:
                return 0;
        }
    }

    static assessCodeQuality(syntaxResult: SyntaxAnalysisResult, metricsResult: MetricsAnalysisResult, complexityResult: ComplexityResult): number {

        // Set initial score to 100
        let score = 100;

        //Impact weight of each metrics
        const weightLoopCount = 0.5;
        const weightNestedLoopCount = 2;
        const weightRecursion = 5;
        const weightFunctionCalls = 0.1;
        const weightConditionals = 0.2;
        const weightDataStructures = 1;
        const weightBigONotation = 5;
        const weightErrors = 2;

        // Extract metrics from the analysis results
        const errors = syntaxResult.errors;
        const { loopCount, nestedLoopCount, hasRecursion, functionCalls, conditionals, dataStructures } = metricsResult;
        const bigONotationString = complexityResult.bigONotation;

        // Get the numerical value of the Big O notation
        const bigONotationValue = this.getBigONotationValue(bigONotationString);

        // Get the how many errors are in the code
        const errorCount = errors.length;

        // Apply impacts based on metrics
        score -= (loopCount * weightLoopCount);
        score -= (nestedLoopCount * weightNestedLoopCount);
        if (hasRecursion) {
            score -= weightRecursion;
        }
        score -= (functionCalls * weightFunctionCalls);
        score -= (conditionals * weightConditionals);
        score -= (dataStructures * weightDataStructures);
        score -= (bigONotationValue * weightBigONotation);
        score -= (errorCount * weightErrors);
        score = Math.max(0, Math.min(100, score));

        return score;
    }
}
