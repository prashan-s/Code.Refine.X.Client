interface Field {
    type: string;
    name: string;
}

export class AutoGenerateCode {
    private javaClassRegex = /class\s+(\w+)\s*{/;
    private fieldsRegex = /(?:private|public|protected)\s+(\w+)\s+(\w+);/g;

    constructor(private code: string) {}

    public generateAll(): { interface: string; constructor: string; json: string } {
        const className = this.extractClassName();
        const fields = this.extractFields();

        const interfaceCode = this.generateInterface(className, fields);
        const constructorCode = this.generateConstructor(className, fields);
        const jsonCode = this.generateJson(fields);

        return {
            interface: interfaceCode,
            constructor: constructorCode,
            json: jsonCode,
        };
    }

    private extractClassName(): string {
        const classNameMatch = this.javaClassRegex.exec(this.code);
        return classNameMatch ? classNameMatch[1] : 'UnknownClass';
    }

    private extractFields(): Field[] {
        const fields: Field[] = [];
        let match;
        while ((match = this.fieldsRegex.exec(this.code)) !== null) {
            fields.push({ type: match[1], name: match[2] });
        }
        return fields;
    }

    private generateInterface(className: string, fields: Field[]): string {
        let interfaceCode = `public interface I${className} {\n`;
        fields.forEach((field) => {
            interfaceCode += `  ${field.type} get${this.capitalize(field.name)}();\n`;
        });
        interfaceCode += '}\n';
        return interfaceCode;
    }

    private generateConstructor(className: string, fields: Field[]): string {
        let constructorCode = `public ${className}(`;
        constructorCode += fields
            .map((field) => `${field.type} ${field.name}`)
            .join(', ');
        constructorCode += ') {\n';
        fields.forEach((field) => {
            constructorCode += `  this.${field.name} = ${field.name};\n`;
        });
        constructorCode += '}\n';
        return constructorCode;
    }

    private generateJson(fields: Field[]): string {
        let jsonCode = '{\n';
        fields.forEach((field) => {
            jsonCode += `  "${field.name}": "<${field.type}>",\n`;
        });
        jsonCode += '}\n';
        return jsonCode;
    }

    private capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
