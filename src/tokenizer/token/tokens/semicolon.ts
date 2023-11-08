import { Token } from "../Token";
import { TokenType } from "../TokenType";

class SemicolonToken extends Token<TokenType.SEMICOLON, ';'> {
    public readonly type = TokenType.SEMICOLON;
}

export { SemicolonToken };
