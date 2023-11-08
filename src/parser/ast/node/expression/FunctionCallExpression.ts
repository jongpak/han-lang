import { LeftParanToken } from "../../../../tokenizer/token/tokens/bracket";
import { TreeNode, TreeNodeType } from "../../TreeNode";
import { Identifier } from "../Identifier";

class FunctionCallExpression extends TreeNode {
    public readonly type = TreeNodeType.FunctionCallExpression;

    public readonly token: LeftParanToken;

    public readonly identifier: Identifier;
    public readonly name: string;

    public readonly parameters: TreeNode[];

    constructor(token: LeftParanToken, identifier: Identifier, parameters: TreeNode[]) {
        super();

        this.token = token;
        this.identifier = identifier;
        this.parameters = parameters;

        this.name = identifier.name;
    }

    public toString(): string {
        return `${this.name}(${this.parameters.map((args) => args.toString()).join(', ')})`;
    }
}

export { FunctionCallExpression };
