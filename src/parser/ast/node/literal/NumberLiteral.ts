import { NumberToken } from "../../../../tokenizer/token/tokens/number";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class NumberLiteral extends TreeNode {
    public type = TreeNodeType.NumberLiteral;

    public token: NumberToken;

    public value: number;

    constructor(token: NumberToken) {
        super();

        this.token = token;
        this.value = Number(token.value);
    }

    public toString(): string {
        return String(this.value);
    }

}

export { NumberLiteral };
