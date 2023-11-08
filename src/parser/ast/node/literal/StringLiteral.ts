import { StringToken } from "../../../../tokenizer/token/tokens/string";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class StringLiteral extends TreeNode {
    public type = TreeNodeType.StringLiteral;

    public token: StringToken;

    public value: string;

    constructor(token: StringToken) {
        super();

        this.token = token;
        this.value = token.value.substring(1, token.value.length - 1);
    }

    public toString(): string {
        return `"${this.value.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\"')}"`;
    }

}

export { StringLiteral };
