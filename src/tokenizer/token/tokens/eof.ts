import { Token } from "../Token";
import { TokenType } from "../TokenType";

class EofToken extends Token<TokenType.EOF, ''> {
    public readonly type = TokenType.EOF;
}

export { EofToken };
