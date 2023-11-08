import { Token } from "../Token";
import { TokenType } from "../TokenType";

class UnknownToken extends Token<TokenType.UNKNOWN> {
    public readonly type = TokenType.UNKNOWN;
}

export { UnknownToken };
