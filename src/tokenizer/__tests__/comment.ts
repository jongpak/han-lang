import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('comment token 1', () => {
    const str = '//';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.COMMENT);
    expect(tokens[0].value).toBe('//');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('comment token 2', () => {
    const str = '// test';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.COMMENT);
    expect(tokens[0].value).toBe('// test');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('comment token 3 - line break', () => {
    const str = '// test\n';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.COMMENT);
    expect(tokens[0].value).toBe('// test');

    expect(tokens[1].type).toBe(TokenType.WHITESPACE);
    expect(tokens[1].value).toBe('\n');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});