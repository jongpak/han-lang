import { Tokenizer } from "../../tokenizer";
import { Parser } from "../Parser";

test('ignore whitespace', () => {
    const str = '\n\r\t ';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    parser.parse();

    const ast = parser.getAst();

    expect(ast.length).toBe(0);
});

test('ignore comment', () => {
    const str = '// 이것은 코멘트입니다';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    parser.parse();

    const ast = parser.getAst();

    expect(ast.length).toBe(0);
});

test('ignore whitespace + comment', () => {
    const str = '// 이것은 코멘트입니다\n\r\t ';
    const tokeiner = new Tokenizer(str);
    tokeiner.tokenize();
    const tokens = tokeiner.getTokens();

    const parser = new Parser(tokens);
    parser.parse();

    const ast = parser.getAst();

    expect(ast.length).toBe(0);
});
