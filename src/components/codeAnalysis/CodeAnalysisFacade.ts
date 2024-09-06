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

export class CodeAnalysisFacade {
    static analyzeCode(code: string): CodeAnalysisResult {
        const language = LanguageDetector.detectLanguage(code);
        const syntax = SyntaxAnalyzer.analyzeSyntax(code);
        const metrics = MetricsAnalyzer.analyzeMetrics(code);
        const complexity = ComplexityAnalyzer.calculateComplexity(metrics.loopCount, metrics.nestedLoopCount, metrics.hasRecursion);
        const finalScore = QualityAssessor.assessCodeQuality(syntax, metrics, complexity);

        return {
            language,
            syntax,
            metrics,
            complexity,
            finalScore
        };

    }
}