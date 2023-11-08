import { PlusOperatorToken } from "../../../../tokenizer/token/tokens/operator";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class PlusExpression extends TreeNode {
    public readonly type = TreeNodeType.PlusExpression;

    public readonly token: PlusOperatorToken;

    public readonly operator: string;

    public readonly left: TreeNode;
    public readonly right: TreeNode;

    constructor(token: PlusOperatorToken, left: TreeNode, right: TreeNode) {
        super();

        this.token = token;
        this.left = left;
        this.right = right;

        this.operator = token.value;
    }

    public toString(): string {
        return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
    }
}

export { PlusExpression };
