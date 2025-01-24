import { parse } from 'java-parser';

class CategorizeJavaCode {

    public static categorizeCode = (code: string) => {
        const ast = parse(code);
        const blocks: { static: string[], public: string[], private: string[] } = { static: [], public: [], private: [] };

        const visitNode = (node: any) => {
            if (node.modifiers) {
                const modifiers = node.modifiers.map((mod: any) => mod.name);

                if (node.type === 'MethodDeclaration') {
                    const methodSignature = `${modifiers.join(' ')} ${node.typeTypeOrVoid} ${node.name.identifier}(${node.formalParameters.parameters.map((p: any) => `${p.typeType} ${p.variableDeclaratorId.identifier}`).join(', ')})`;
                    const methodBody = code.slice(node.methodBody.start.startIndex, node.methodBody.stop.stopIndex + 1);
                    const methodDeclaration = `${methodSignature} ${methodBody}`;

                    if (modifiers.includes('static')) {
                        blocks.static.push(methodDeclaration);
                    } else if (modifiers.includes('private')) {
                        blocks.private.push(methodDeclaration);
                    } else if (modifiers.includes('public')) {
                        blocks.public.push(methodDeclaration);
                    }
                }

                if (node.type === 'FieldDeclaration') {
                    const variableSignature = `${modifiers.join(' ')} ${node.typeType} ${node.variableDeclarators[0].variableDeclaratorId.identifier};`;
                    if (modifiers.includes('static')) {
                        blocks.static.push(variableSignature);
                    } else if (modifiers.includes('private')) {
                        blocks.private.push(variableSignature);
                    } else if (modifiers.includes('public')) {
                        blocks.public.push(variableSignature);
                    }
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