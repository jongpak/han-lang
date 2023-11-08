import { NotEqualOperatorToken } from "../../../../tokenizer/token/tokens/operator";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class NotEqualExpression extends TreeNode {
    public readonly type = TreeNodeType.NotEqualExpression;

    public readonly token: NotEqualOperatorToken;

    public readonly operator: string;

    public readonly left: TreeNode;
    public readonly right: TreeNode;

    constructor(token: NotEqualOperatorToken, left: TreeNode, right: TreeNode) {
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

export { NotEqualExpression };
