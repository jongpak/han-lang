import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('number token - 1', () => {
    const str = '1';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('1');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('number token - 123', () => {
    const str = '123';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('123');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('number token - 1.', () => {
    const str = '1.';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('1.');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('number token - 1.23', () => {
    const str = '1.23';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('1.23');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('number token - 1.23.', () => {
    const str = '1.23.';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('1.23');

    expect(tokens[1].type).toBe(TokenType.UNKNOWN);
    expect(tokens[1].value).toBe('.');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});