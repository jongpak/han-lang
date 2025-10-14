import { Token } from '../Token';
import { TokenType } from '../TokenType';

export class IdentifierToken extends Token<TokenType.IDENTIFIER> {
  public readonly type = TokenType.IDENTIFIER;
}
