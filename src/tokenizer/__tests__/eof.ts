import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('eof token', () => {
    const str = '';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.EOF);
    expect(tokens[0].value).toBe('');

    expect(tokens.length).toBe(1);
});
