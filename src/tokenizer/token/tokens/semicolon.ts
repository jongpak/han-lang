import { Token } from '../Token';
import { TokenType } from '../TokenType';

export class SemicolonToken extends Token<TokenType.SEMICOLON, ';'> {
  public readonly type = TokenType.SEMICOLON;
}
