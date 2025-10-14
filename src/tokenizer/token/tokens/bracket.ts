import { Token } from '../Token';
import { TokenType } from '../TokenType';

export class LeftParanToken extends Token<TokenType.LEFT_PAREN, '('> {
  public readonly type = TokenType.LEFT_PAREN;
}

export class RightParanToken extends Token<TokenType.RIGHT_PAREN, ')'> {
  public readonly type = TokenType.RIGHT_PAREN;
}

export class LeftBraceToken extends Token<TokenType.LEFT_BRACE, '{'> {
  public readonly type = TokenType.LEFT_BRACE;
}

export class RightBraceToken extends Token<TokenType.RIGHT_BRACE, '}'> {
  public readonly type = TokenType.RIGHT_BRACE;
}

export class LeftBracketToken extends Token<TokenType.LEFT_BRACKET, '['> {
  public readonly type = TokenType.LEFT_BRACKET;
}

export class RightBracketToken extends Token<TokenType.RIGHT_BRACKET, ']'> {
  public readonly type = TokenType.RIGHT_BRACKET;
}
