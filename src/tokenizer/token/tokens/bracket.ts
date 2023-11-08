import { Token } from "../Token";
import { TokenType } from "../TokenType";

class LeftParanToken extends Token<TokenType.LEFT_PAREN, '('> {
    public readonly type = TokenType.LEFT_PAREN;
}

class RightParanToken extends Token<TokenType.RIGHT_PAREN, ')'> {
    public readonly type = TokenType.RIGHT_PAREN;
}

class LeftBraceToken extends Token<TokenType.LEFT_BRACE, '{'> {
    public readonly type = TokenType.LEFT_BRACE;
}

class RightBraceToken extends Token<TokenType.RIGHT_BRACE, '}'> {
    public readonly type = TokenType.RIGHT_BRACE;
}

class LeftBracketToken extends Token<TokenType.LEFT_BRACKET, '['> {
    public readonly type = TokenType.LEFT_BRACKET;
}

class RightBracketToken extends Token<TokenType.RIGHT_BRACKET, ']'> {
    public readonly type = TokenType.RIGHT_BRACKET;
}

export {
    LeftParanToken,
    RightParanToken,

    LeftBraceToken,
    RightBraceToken,

    LeftBracketToken,
    RightBracketToken,
};
