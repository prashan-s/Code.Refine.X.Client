import { parse } from 'java-parser';

class CategorizeJavaCode {

    public static categorizeCode = (code: string) => {
        const ast = parse(code);
        const blocks: { static: string[], public: string[], private: string[] } = { static: [], public: [], private: [] };

        const visitNode = (node: any) => {
            if (node.modifiers) {
                const modifiers = node.modifiers.map((mod: any) => mod.name);
                if (modifiers.includes('static')) {
                    blocks.static.push(node.name.identifier);
                } else if (modifiers.includes('private')) {
                    blocks.private.push(node.name.identifier);
                } else if (modifiers.includes('public')) {
                    blocks.public.push(node.name.identifier);
                }
            }
        };


        const visit = (node: any) => {
            if (Array.isArray(node)) {
                node.forEach(visitNode);
            } else if (node && typeof node === 'object') {
                Object.keys(node).forEach((key) => visit(node[key]));
            }
        };

        visit(ast);

        return blocks;
    };

}

export default CategorizeJavaCode;