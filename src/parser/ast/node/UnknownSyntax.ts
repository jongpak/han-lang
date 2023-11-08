import { Token } from "../../../tokenizer/token/Token";
import { TokenType } from "../../../tokenizer/token/TokenType";
import { TreeNode, TreeNodeType } from "../TreeNode";

class UnknownSyntax extends TreeNode {
    public type = TreeNodeType.Unknown;

    public token: Token<TokenType>;

    constructor(token: Token<TokenType>) {
        super();

        this.token = token;
    }

    public toString(): string {
        return `<!-UNKNOWN:${this.token.value}->`;
    }
}

export { UnknownSyntax };
