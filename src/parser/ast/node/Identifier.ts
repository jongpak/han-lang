import { IdentifierToken } from "../../../tokenizer/token/tokens/identifier";
import { TreeNode, TreeNodeType } from "../TreeNode";

class Identifier extends TreeNode {
    public type = TreeNodeType.Identifier;

    public token: IdentifierToken;

    public name: string;

    constructor(token: IdentifierToken) {
        super();

        this.token = token;
        this.name = token.value;
    }

    public toString(): string {
        return this.token.value;
    }
}

export { Identifier };
