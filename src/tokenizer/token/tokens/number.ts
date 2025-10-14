import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class NumberToken extends Token<TokenType.NUMBER> {
    public readonly type = TokenType.NUMBER;
}
