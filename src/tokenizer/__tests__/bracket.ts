import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../token/TokenType";

test('(, ) token', () => {
    const str = '()';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.LEFT_PAREN);
    expect(tokens[0].value).toBe('(');

    expect(tokens[1].type).toBe(TokenType.RIGHT_PAREN);
    expect(tokens[1].value).toBe(')');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});

test('{, } token', () => {
    const str = '{}';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.LEFT_BRACE);
    expect(tokens[0].value).toBe('{');

    expect(tokens[1].type).toBe(TokenType.RIGHT_BRACE);
    expect(tokens[1].value).toBe('}');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});


test('[, ] token', () => {
    const str = '[]';

    const tokenizer = new Tokenizer(str);
    tokenizer.tokenize();

    const tokens = tokenizer.getTokens();

    expect(tokens[0].type).toBe(TokenType.LEFT_BRACKET);
    expect(tokens[0].value).toBe('[');

    expect(tokens[1].type).toBe(TokenType.RIGHT_BRACKET);
    expect(tokens[1].value).toBe(']');

    expect(tokens[2].type).toBe(TokenType.EOF);
    expect(tokens[2].value).toBe('');

    expect(tokens.length).toBe(3);
});
