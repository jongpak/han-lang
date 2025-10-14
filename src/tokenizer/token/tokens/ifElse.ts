import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class IfToken extends Token<TokenType.IF, '만약'> {
    public readonly type = TokenType.IF;
}

export class ElseToken extends Token<TokenType.ELSE, '아니면'> {
    public readonly type = TokenType.ELSE;
}
