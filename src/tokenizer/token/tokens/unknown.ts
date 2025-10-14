import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class UnknownToken extends Token<TokenType.UNKNOWN> {
    public readonly type = TokenType.UNKNOWN;
}
