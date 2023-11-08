import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('multi token', () => {
    const str = '이름 = "박종훈";';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe('이름');

    expect(tokens[1].type).toBe(TokenType.WHITESPACE);
    expect(tokens[1].value).toBe(' ');

    expect(tokens[2].type).toBe(TokenType.OP_ASSIGN);
    expect(tokens[2].value).toBe('=');

    expect(tokens[3].type).toBe(TokenType.WHITESPACE);
    expect(tokens[3].value).toBe(' ');

    expect(tokens[4].type).toBe(TokenType.STRING);
    expect(tokens[4].value).toBe('"박종훈"');

    expect(tokens[5].type).toBe(TokenType.SEMICOLON);
    expect(tokens[5].value).toBe(';');

    expect(tokens[6].type).toBe(TokenType.EOF);
    expect(tokens[6].value).toBe('');

    expect(tokens.length).toBe(7);
});
