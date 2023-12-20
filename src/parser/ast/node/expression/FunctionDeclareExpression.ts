import { LeftParanToken } from "../../../../tokenizer/token/tokens/bracket";
import { IdentifierToken } from "../../../../tokenizer/token/tokens/identifier";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class FunctionDeclareExpression extends TreeNode {
    public readonly type = TreeNodeType.FunctionDeclareExpression;
    public readonly token: LeftParanToken;

    public readonly parameters: IdentifierToken[];
    public readonly body: TreeNode[];

    constructor(token: LeftParanToken, parameters: IdentifierToken[], body: TreeNode[]) {
        super();

        this.token = token;
        this.parameters = parameters;
        this.body = body;
    }

    public toString(): string {
        return `(${this.parameters.map((args) => args.toString()).join(', ')}) {
    ${this.body.map((args) => `${args.toString().split('\n').join('\n    ')}`).join('\n    ')}
}`;
    }
}

export { FunctionDeclareExpression };
