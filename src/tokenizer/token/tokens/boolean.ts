import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class TrueToken extends Token<TokenType.TRUE, '참'> {
    public readonly type = TokenType.TRUE;
}

export class FalseToken extends Token<TokenType.FALSE, '거짓'> {
    public readonly type = TokenType.FALSE;
}
