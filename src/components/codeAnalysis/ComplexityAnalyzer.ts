export interface ComplexityResult {
    bigONotation: string;
}

export class ComplexityAnalyzer {
    static calculateComplexity(loopCount: number, nestedLoopCount: number, hasRecursion: boolean): ComplexityResult {

        let bigONotation = 'O(1)';

        if (loopCount > 0) {
            bigONotation = 'O(n)';
        }
        if (nestedLoopCount > 0) {        
            bigONotation = `O(n^${nestedLoopCount + 1})`;
        }
        if (hasRecursion) {
            bigONotation = this.determineRecursionComplexity(loopCount, nestedLoopCount , bigONotation);
        }

        return { bigONotation };
    }

    private static determineRecursionComplexity(loopCount: number, nestedLoopDepth: number, currentBigO: string): string {
        // Base case: If recursion without loops, assume exponential complexity
        if (loopCount === 0 && nestedLoopDepth === 0) {
            return 'O(2^n)'; 
        }

        // Case 1: Recursion with a single loop -> generally O(n log n)
        if (loopCount > 0 && nestedLoopDepth === 0) {
            return 'O(n log n)'; // Common in algorithms like merge sort
        }

        // Case 2: Recursion with nested loops -> could lead to highly complex structures
        if (nestedLoopDepth > 0) {
            return `O(n^${nestedLoopDepth} * log n)`; // Recursion with nested loops results in log n added complexity
        }

        // If current complexity already exponential (e.g., recursion on top of O(2^n)), maintain exponential
        if (currentBigO.startsWith('O(2^')) {
            return 'O(2^n)';
        }

        // General case: Add exponential recursion complexity to existing loop complexity
        return `${currentBigO} * 2^n`;
    }

    // private static determineRecursionComplexity(currentBigO: string): string {
    //     if (currentBigO === 'O(1)') {
    //         return 'O(2^n)'; 
    //     } else if (currentBigO.startsWith('O(n^')) {
    //         return 'O(n^n)'; 
    //     } else if (currentBigO === 'O(n)') {
    //         return 'O(n * 2^n)';
    //     }
    //     return currentBigO;
    // }

}
