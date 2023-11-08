import { Token } from "../Token";
import { TokenType } from "../TokenType";

class CommentToken extends Token<TokenType.COMMENT> {
    public readonly type = TokenType.COMMENT;
}

export { CommentToken };
