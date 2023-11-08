import { Token } from "../Token";
import { TokenType } from "../TokenType";

class NumberToken extends Token<TokenType.NUMBER> {
    public readonly type = TokenType.NUMBER;
}

export { NumberToken };
