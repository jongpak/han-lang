import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('whitespace token', () => {
    const str = '\n\r ';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.WHITESPACE);
    expect(tokens[0].value).toBe('\n');

    expect(tokens[1].type).toBe(TokenType.WHITESPACE);
    expect(tokens[1].value).toBe('\r');

    expect(tokens[2].type).toBe(TokenType.WHITESPACE);
    expect(tokens[2].value).toBe(' ');

    expect(tokens[3].type).toBe(TokenType.EOF);
    expect(tokens[3].value).toBe('');

    expect(tokens.length).toBe(4);
});
