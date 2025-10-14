import { Tokenizer } from '../../tokenizer';
import { FunctionCallExpression } from '../ast/node/expression/FunctionCallExpression';
import type { Identifier } from '../ast/node/Identifier';
import type { BooleanLiteral } from '../ast/node/literal/BooleanLiteral';
import type { NumberLiteral } from '../ast/node/literal/NumberLiteral';
import type { StringLiteral } from '../ast/node/literal/StringLiteral';
import { TreeNodeType } from '../ast/TreeNode';
import { Parser } from '../Parser';

test('function - simple call', () => {
  const str = '어떤함수();';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as FunctionCallExpression;

  expect(stmt instanceof FunctionCallExpression).toBe(true);
  expect(stmt.name).toBe('어떤함수');
  expect(stmt.parameters.length).toBe(0);

  expect(ast.length).toBe(1);
});

test('function - parameter: literal', () => {
  const str = '어떤함수(123, "문자열", 참);';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as FunctionCallExpression;

  expect(stmt instanceof FunctionCallExpression).toBe(true);
  expect(stmt.name).toBe('어떤함수');
  expect(stmt.parameters.length).toBe(3);

  expect(stmt.parameters[0].type).toBe(TreeNodeType.NumberLiteral);
  expect((stmt.parameters[0] as NumberLiteral).value).toBe(123);
  expect(stmt.parameters[1].type).toBe(TreeNodeType.StringLiteral);
  expect((stmt.parameters[1] as StringLiteral).value).toBe('문자열');
  expect(stmt.parameters[2].type).toBe(TreeNodeType.BooleanLiteral);
  expect((stmt.parameters[2] as BooleanLiteral).value).toBe(true);

  expect(stmt instanceof FunctionCallExpression).toBe(true);
  expect(stmt.name).toBe('어떤함수');
  expect(stmt.parameters.length).toBe(0);
  expect(ast.length).toBe(1);
});

test('function - parameter: 변수, 다른 함수의 값', () => {
  const str = '어떤함수(어떤변수, 다른어떤함수(), 다른어떤함수(123, "문자열", 참));';
  const tokeiner = new Tokenizer(str);
  tokeiner.tokenize();
  const tokens = tokeiner.getTokens();

  const parser = new Parser(tokens);
  const ast = parser.parse();
  const stmt = ast[0] as FunctionCallExpression;

  expect(stmt instanceof FunctionCallExpression).toBe(true);
  expect(stmt.name).toBe('어떤함수');
  expect(stmt.parameters.length).toBe(2);

  expect(stmt.parameters[0].type).toBe(TreeNodeType.Identifier);
  expect((stmt.parameters[0] as Identifier).name).toBe('어떤변수');

  expect(stmt.parameters[1].type).toBe(TreeNodeType.FunctionCallExpression);
  expect((stmt.parameters[1] as FunctionCallExpression).name).toBe('다른어떤함수');
  expect((stmt.parameters[1] as FunctionCallExpression).parameters.length).toBe(0);

  expect(stmt.parameters[2].type).toBe(TreeNodeType.FunctionCallExpression);
  expect((stmt.parameters[2] as FunctionCallExpression).name).toBe('다른어떤함수');
  expect((stmt.parameters[2] as FunctionCallExpression).parameters.length).toBe(3);
  expect((stmt.parameters[2] as FunctionCallExpression).parameters[0].type).toBe(TreeNodeType.NumberLiteral);
  expect(((stmt.parameters[2] as FunctionCallExpression).parameters[0] as NumberLiteral).value).toBe(123);
  expect((stmt.parameters[2] as FunctionCallExpression).parameters[1].type).toBe(TreeNodeType.StringLiteral);
  expect(((stmt.parameters[2] as FunctionCallExpression).parameters[1] as StringLiteral).value).toBe('문자열');
  expect((stmt.parameters[2] as FunctionCallExpression).parameters[2].type).toBe(TreeNodeType.BooleanLiteral);
  expect(((stmt.parameters[2] as FunctionCallExpression).parameters[2] as BooleanLiteral).value).toBe(true);

  expect(stmt instanceof FunctionCallExpression).toBe(true);
  expect(stmt.name).toBe('어떤함수');
  expect(stmt.parameters.length).toBe(0);
  expect(ast.length).toBe(1);
});
