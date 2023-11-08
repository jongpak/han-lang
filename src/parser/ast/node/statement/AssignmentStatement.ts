import { AssignOperatorToken } from "../../../../tokenizer/token/tokens/operator";
import { TreeNode, TreeNodeType } from "../../TreeNode";
import { Identifier } from "../Identifier";
import { UnknownSyntax } from "../UnknownSyntax";
import { DivideExpression } from "../expression/DivideExpression";
import { FunctionCallExpression } from "../expression/FunctionCallExpression";
import { MinusExpression } from "../expression/MinusExpression";
import { MultiplyExpression } from "../expression/MultiplyExpression";
import { PlusExpression } from "../expression/PlusExpression";
import { BooleanLiteral } from "../literal/BooleanLiteral";
import { NumberLiteral } from "../literal/NumberLiteral";
import { StringLiteral } from "../literal/StringLiteral";

type Literal = NumberLiteral | StringLiteral | BooleanLiteral;
type MathExpression = PlusExpression | MinusExpression | MultiplyExpression | DivideExpression;

class AssignmentStatement extends TreeNode {
    public readonly type = TreeNodeType.AssignmentStatement;

    public readonly token: AssignOperatorToken;
    public readonly operator: string;

    public readonly left: Identifier;
    public readonly right: Literal | MathExpression | FunctionCallExpression | UnknownSyntax;

    constructor(
        token: AssignOperatorToken,
        left: Identifier,
        right: Literal | MathExpression | FunctionCallExpression | UnknownSyntax
    ) {
        super();

        this.token = token;
        this.operator = token.value;

        this.left = left;
        this.right = right;
    }

    public toString(): string {
        return `${this.left.name} ${this.operator} ${this.right.toString()};`;
    }

}

export { AssignmentStatement };
