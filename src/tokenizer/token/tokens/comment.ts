import { Token } from '../Token';
import { TokenType } from '../TokenType';

export class CommentToken extends Token<TokenType.COMMENT> {
  public readonly type = TokenType.COMMENT;
}
