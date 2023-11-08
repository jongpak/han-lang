import { Token } from "../Token";
import { TokenType } from "../TokenType";

class StringToken extends Token<TokenType.STRING> {
    public readonly type = TokenType.STRING;
}

export { StringToken };
