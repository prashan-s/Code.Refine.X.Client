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
            bigONotation = this.determineRecursionComplexity(bigONotation);
        }

        return { bigONotation };
    }

    private static determineRecursionComplexity(currentBigO: string): string {
        if (currentBigO === 'O(1)') {
            return 'O(2^n)'; 
        } else if (currentBigO.startsWith('O(n^')) {
            return 'O(n^n)'; 
        } else if (currentBigO === 'O(n)') {
            return 'O(n * 2^n)';
        }
        return currentBigO;
    }

}
