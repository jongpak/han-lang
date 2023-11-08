import { Token } from "../Token";
import { TokenType } from "../TokenType";

class IdentifierToken extends Token<TokenType.IDENTIFIER> {
    public readonly type = TokenType.IDENTIFIER;
}

export { IdentifierToken };
