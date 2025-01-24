export class LanguageDetector {
    static detectLanguage(code: string): string {
        const normalizedCode = code.trim().toLowerCase();

        const javaPatterns = [
            'public static void main',
            'class ',
            'import java.',
            'public class ',
            'extends ',
            'implements ',
            'void ',
            'public ',
            'private ',
            'protected ',
            'package ',
            'throws ',
            'System.out.println',
        ];

        for (const pattern of javaPatterns) {
            if (normalizedCode.includes(pattern)) {
                return 'Java';
            }
        }

        return 'Unknown';
    }
}
