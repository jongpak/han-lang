import { Token } from "../Token";
import { TokenType } from "../TokenType";

class CommaToken extends Token<TokenType.COMMA, ','> {
    public readonly type = TokenType.COMMA;
}

export { CommaToken };
