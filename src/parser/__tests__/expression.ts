import { Tokenizer } from "../../tokenizer";
import { Parser } from "../Parser";
import { TreeNodeType } from "../ast/TreeNode";
import { BooleanLiteral } from "../ast/node/literal/BooleanLiteral";
import { NumberLiteral } from "../ast/node/literal/NumberLiteral";
import { StringLiteral } from "../ast/node/literal/StringLiteral";

test('expression - number', () => {
    const str = '123';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.NumberLiteral);
    expect((expr as NumberLiteral).value).toBe(123);
});

test('expression - string literal', () => {
    const str = '"문자열"';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.StringLiteral);
    expect((expr as StringLiteral).value).toBe('문자열');
});

test('expression - true', () => {
    const str = '참';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.BooleanLiteral);
    expect((expr as BooleanLiteral).value).toBe(true);
});

test('expression - false', () => {
    const str = '거짓';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.BooleanLiteral);
    expect((expr as BooleanLiteral).value).toBe(false);
});

test('expression - 1 + 2', () => {
    const str = '1 + 2';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.PlusExpression);
    expect(expr.toString()).toBe('(1 + 2)');
});

test('expression - 1 - 2', () => {
    const str = '1 - 2';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.MinusExpression);
    expect(expr.toString()).toBe('(1 - 2)');
});

test('expression - 1 * 2', () => {
    const str = '1 * 2';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.MultiplyExpression);
    expect(expr.toString()).toBe('(1 * 2)');
});

test('expression - 1 / 2', () => {
    const str = '1 / 2';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.DivideExpression);
    expect(expr.toString()).toBe('(1 / 2)');
});

test('expression - 1 + 2 - 3 * 4 / 5', () => {
    const str = '1 + 2 - 3 * 4 / 5';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    const expr = parser['parseExpression']();

    expect(expr.type).toBe(TreeNodeType.MinusExpression);
    expect(expr.toString()).toBe('((1 + 2) - ((3 * 4) / 5))');
});