import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('참 token', () => {
    const str = '참';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.TRUE);
    expect(tokens[0].value).toBe('참');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});

test('거짓 token', () => {
    const str = '거짓';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.FALSE);
    expect(tokens[0].value).toBe('거짓');

    expect(tokens[1].type).toBe(TokenType.EOF);
    expect(tokens[1].value).toBe('');

    expect(tokens.length).toBe(2);
});