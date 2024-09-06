export interface ComplexityResult {
    bigONotation: string;
}

export class ComplexityAnalyzer {
    static calculateComplexity(loopCount: number, nestedLoopCount: number, hasRecursion: boolean): ComplexityResult {

        let bigONotation = 'O(1)';

        if (loopCount > 0) {
            bigONotation = 'O(n)'; // Base case if there is at least one loop
        }
        if (nestedLoopCount > 0) {
            // If there are nested loops, we calculate based on the depth of nesting
            bigONotation = `O(n^${nestedLoopCount + 1})`; // Adjust to include both top-level and nested loops
        }
        if (hasRecursion) {
            // Adjust the complexity if the function has recursion
            bigONotation = this.determineRecursionComplexity(bigONotation);
        }

        return { bigONotation };
    }

    private static determineRecursionComplexity(currentBigO: string): string {
        // Adjusts the Big O notation if recursion is detected
        if (currentBigO === 'O(1)') {
            return 'O(2^n)'; // Simple exponential complexity if recursion is the primary factor
        } else if (currentBigO.startsWith('O(n^')) {
            return 'O(n^n)'; // Assumes complex recursive logic with nested loops
        } else if (currentBigO === 'O(n)') {
            return 'O(n * 2^n)'; // Linear recursion with a linear loop structure
        }
        return currentBigO; // Default case: no change needed
    }

}
