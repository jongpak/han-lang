import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class StringToken extends Token<TokenType.STRING> {
    public readonly type = TokenType.STRING;
}
