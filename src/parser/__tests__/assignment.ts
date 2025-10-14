import { Tokenizer } from '../../tokenizer';
import { TokenType } from '../../tokenizer/token/TokenType';
import { Parser } from '../Parser';
import { TreeNodeType } from '../ast/TreeNode';
import type { FunctionCallExpression } from '../ast/node/expression/FunctionCallExpression';
import type { FunctionDeclareExpression } from '../ast/node/expression/FunctionDeclareExpression';
import type { BooleanLiteral } from '../ast/node/literal/BooleanLiteral';
import type { NumberLiteral } from '../ast/node/literal/NumberLiteral';
import type { StringLiteral } from '../ast/node/literal/StringLiteral';
import type { AssignmentStatement } from '../ast/node/statement/AssignmentStatement';

test('assignment statement - number', () => {
  const str = '숫자 = 123;';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.type).toBe(TreeNodeType.AssignmentStatement);
  expect(stmt.token.type).toBe(TokenType.OP_ASSIGN);

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('숫자');

  expect(stmt.right.type).toBe(TreeNodeType.NumberLiteral);
  expect((stmt.right as NumberLiteral).value).toBe(123);

  expect(ast.length).toBe(1);
});

test('assignment statement - string', () => {
  const str = '문자 = "문자열";';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.type).toBe(TreeNodeType.AssignmentStatement);
  expect(stmt.token.type).toBe(TokenType.OP_ASSIGN);

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('문자');

  expect(stmt.right.type).toBe(TreeNodeType.StringLiteral);
  expect((stmt.right as StringLiteral).value).toBe('문자열');

  expect(ast.length).toBe(1);
});

test('assignment statement - true', () => {
  const str = '진리 = 참;';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.type).toBe(TreeNodeType.AssignmentStatement);
  expect(stmt.token.type).toBe(TokenType.OP_ASSIGN);

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('진리');

  expect(stmt.right.type).toBe(TreeNodeType.BooleanLiteral);
  expect((stmt.right as BooleanLiteral).value).toBe(true);

  expect(ast.length).toBe(1);
});

test('assignment statement - false', () => {
  const str = '진리 = 거짓;';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('진리');

  expect(stmt.right.type).toBe(TreeNodeType.BooleanLiteral);
  expect((stmt.right as BooleanLiteral).value).toBe(false);

  expect(ast.length).toBe(1);
});

test('assignment statement - function call', () => {
  const str = '결과 = 함수값();';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('결과');

  expect(stmt.right.type).toBe(TreeNodeType.FunctionCallExpression);
  expect((stmt.right as FunctionCallExpression).name).toBe('함수값');
  expect((stmt.right as FunctionCallExpression).parameters.length).toBe(0);

  expect(ast.length).toBe(1);
});

test('assignment statement - function call (multi parameters)', () => {
  const str = '결과 = 함수값(1 + 1, 참, 거짓, 다른함수(1, 2));';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as AssignmentStatement;

  expect(stmt.left.type).toBe(TreeNodeType.Identifier);
  expect(stmt.left.name).toBe('결과');

  expect(stmt.right.type).toBe(TreeNodeType.FunctionCallExpression);
  expect((stmt.right as FunctionCallExpression).name).toBe('함수값');
  expect((stmt.right as FunctionCallExpression).parameters.length).toBe(4);

  expect(ast.length).toBe(1);
});
