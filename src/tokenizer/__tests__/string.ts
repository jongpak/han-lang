import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('string token 1 - empty', () => {
    const str = '""';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('""');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('string token 2', () => {
    const str = '"test"';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('"test"');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('string token 3 - escape', () => {
    const str = '"test\\"test"';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('"test\\"test"');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('string token 4 - escape', () => {
    const str = `"test\ntest"`;

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('"test\ntest"');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('string token 5 - multi-line', () => {
    const str = `"test
test"`;

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('"test\ntest"');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('string token 6 - invalid/missing "', () => {
    const str = `"test`;

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.UNKNOWN);
    expect(tokens[0].value).toBe('"');

    expect(tokens[1].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[1].value).toBe('test');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});