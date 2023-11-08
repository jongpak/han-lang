import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('만약 token', () => {
    const str = '만약';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IF);
    expect(tokens[0].value).toBe('만약');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('아니면 token', () => {
    const str = '아니면';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.ELSE);
    expect(tokens[0].value).toBe('아니면');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});