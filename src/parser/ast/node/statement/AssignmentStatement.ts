import type { AssignOperatorToken } from '../../../../tokenizer/token/tokens/operator';
import { TreeNode, TreeNodeType } from '../../TreeNode';
import type { Identifier } from '../Identifier';
import type { UnknownSyntax } from '../UnknownSyntax';
import type { DivideExpression } from '../expression/DivideExpression';
import type { FunctionCallExpression } from '../expression/FunctionCallExpression';
import type { MinusExpression } from '../expression/MinusExpression';
import type { MultiplyExpression } from '../expression/MultiplyExpression';
import type { PlusExpression } from '../expression/PlusExpression';
import type { BooleanLiteral } from '../literal/BooleanLiteral';
import type { NumberLiteral } from '../literal/NumberLiteral';
import type { StringLiteral } from '../literal/StringLiteral';

type Literal = NumberLiteral | StringLiteral | BooleanLiteral;
type MathExpression = PlusExpression | MinusExpression | MultiplyExpression | DivideExpression;

export class AssignmentStatement extends TreeNode {
  public readonly type = TreeNodeType.AssignmentStatement;

  public readonly token: AssignOperatorToken;
  public readonly operator: string;

  public readonly left: Identifier;
  public readonly right: Literal | MathExpression | FunctionCallExpression | UnknownSyntax;

  constructor(
    token: AssignOperatorToken,
    left: Identifier,
    right: Literal | MathExpression | FunctionCallExpression | UnknownSyntax,
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
