import { Token } from "../Token";
import { TokenType } from "../TokenType";

class TrueToken extends Token<TokenType.TRUE, '참'> {
    public readonly type = TokenType.TRUE;
}

class FalseToken extends Token<TokenType.FALSE, '거짓'> {
    public readonly type = TokenType.FALSE;
}

export { TrueToken, FalseToken };
