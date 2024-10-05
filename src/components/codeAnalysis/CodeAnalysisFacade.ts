import { LanguageDetector } from "./LanguageDetector";
import { SyntaxAnalysisResult, SyntaxAnalyzer } from "./SyntaxAnalyzer";
import { MetricsAnalysisResult, MetricsAnalyzer } from "./MetricsAnalyzer";
import { ComplexityAnalyzer, ComplexityResult } from "./ComplexityAnalyzer";
import { QualityAssessor } from "./QualityAssessor";

export interface CodeAnalysisResult {
    language: string;
    syntax: SyntaxAnalysisResult;
    metrics: MetricsAnalysisResult;
    complexity: ComplexityResult;
    finalScore: number;
}

export const DefaultCodeAnalysisResult: CodeAnalysisResult = {
    language: "", // Default empty string for language
    syntax: {
        errors: [] // Default empty array for errors
    },
    metrics: {
        loopCount: 0,
        nestedLoopCount: 0,
        hasRecursion: false,
        recursionType: null,
        functionCalls: 0,
        conditionals: 0,
        dataStructures: 0
    },
    complexity: {
        bigONotation: "O(1)" // Default to constant time complexity
    },
    finalScore: 0 // Default score is 0
};

export class CodeAnalysisFacade {
    static analyzeCode(code: string): CodeAnalysisResult {
        const language = LanguageDetector.detectLanguage(code);
        const syntax = SyntaxAnalyzer.analyzeSyntax(code);
        const metrics = MetricsAnalyzer.analyzeMetrics(code);
        const complexity = ComplexityAnalyzer.calculateComplexity(metrics.loopCount, metrics.nestedLoopCount, metrics.hasRecursion);
        const finalScore = QualityAssessor.assessCodeQuality(syntax, metrics, complexity);

        console.log("type:",metrics.recursionType)
        console.log("hasRecur:",metrics.hasRecursion)
        return {
            language,
            syntax,
            metrics,
            complexity,
            finalScore
        };

    }
}