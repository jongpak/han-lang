import { TokenType } from "../../../../tokenizer/token/TokenType";
import { FalseToken, TrueToken } from "../../../../tokenizer/token/tokens/boolean";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class BooleanLiteral extends TreeNode {
    public type = TreeNodeType.BooleanLiteral;

    public token: TrueToken | FalseToken;

    public value: boolean;

    constructor(token: TrueToken | FalseToken) {
        super();

        this.token = token;
        this.value = token.type === TokenType.TRUE;
    }

    public toString(): string {
        return this.value ? '참' : '거짓';
    }

}

export { BooleanLiteral };
