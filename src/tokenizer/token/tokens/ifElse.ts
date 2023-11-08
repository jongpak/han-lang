import { Token } from "../Token";
import { TokenType } from "../TokenType";

class IfToken extends Token<TokenType.IF, '만약'> {
    public readonly type = TokenType.IF;
}

class ElseToken extends Token<TokenType.ELSE, '아니면'> {
    public readonly type = TokenType.ELSE;
}

export { IfToken, ElseToken };
