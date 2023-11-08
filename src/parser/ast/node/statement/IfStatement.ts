import { IfToken } from "../../../../tokenizer/token/tokens/ifElse";
import { TreeNode, TreeNodeType } from "../../TreeNode";

class IfStatement extends TreeNode {
    public readonly type = TreeNodeType.IfStatement;
    public readonly token: IfToken;

    public readonly condition: TreeNode;

    public readonly body: TreeNode[];

    constructor(token: IfToken, condition: TreeNode, body: TreeNode[]) {
        super();

        this.token = token;
        this.condition = condition;
        this.body = body;
    }

    public toString(): string {
        throw new Error("Method not implemented.");
    }
}