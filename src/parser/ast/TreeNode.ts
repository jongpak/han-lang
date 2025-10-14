import type { Token } from '../../tokenizer/token/Token';
import type { TokenType } from '../../tokenizer/token/TokenType';

export enum TreeNodeType {
  Unknown = 'Unknown',

  AssignmentStatement = 'AssignmentStatement',
  IfStatement = 'IfStatement',

  Identifier = 'Identifier',

  PlusExpression = 'PlusExpression',
  MinusExpression = 'MinusExpression',
  MultiplyExpression = 'MultiplyExpression',
  DivideExpression = 'DivideExpression',

  EqualExpression = 'EqualExpression',
  NotEqualExpression = 'NotEqualExpression',

  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  BooleanLiteral = 'BooleanLiteral',

  FunctionCallExpression = 'FunctionCallExpression',
  FunctionDeclareExpression = 'FunctionDeclareExpression',
}

export abstract class TreeNode {
  public abstract readonly type: TreeNodeType;

  public abstract readonly token: Token<TokenType>;

  public abstract toString(): string;
}
