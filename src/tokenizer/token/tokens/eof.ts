import { Token } from "../Token";
import { TokenType } from "../TokenType";

export class EofToken extends Token<TokenType.EOF, ''> {
    public readonly type = TokenType.EOF;
}
