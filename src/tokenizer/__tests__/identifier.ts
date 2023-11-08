import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('identifier token 1', () => {
    const str = '변수명';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('변수명');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('identifier token 2', () => {
    const str = '변수명1';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('변수명1');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('identifier token 3', () => {
    const str = '변수명_1';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('변수명_1');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('identifier token 4', () => {
    const str = '변수1값';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('변수1값');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('identifier token 5', () => {
    const str = '변수,값,NAME,_';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('변수');

    expect(tokens[1].type).toBe(TokenType.COMMA);
    expect(tokens[1].value).toBe(',');

    expect(tokens[2].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[2].value).toBe('값');

    expect(tokens[3].type).toBe(TokenType.COMMA);
    expect(tokens[3].value).toBe(',');

    expect(tokens[4].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[4].value).toBe('NAME');

    expect(tokens[5].type).toBe(TokenType.COMMA);
    expect(tokens[5].value).toBe(',');

    expect(tokens[6].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[6].value).toBe('_');

    expect(tokens[7].type).toBe(TokenType.EOF);
    expect(tokens[7].value).toBe('');

    expect(tokens.length).toBe(8);
});