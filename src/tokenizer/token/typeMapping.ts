import { Token } from "./Token";
import { TokenType } from "./TokenType";
import { FalseToken, TrueToken } from "./tokens/boolean";
import { LeftBraceToken, LeftBracketToken, LeftParanToken, RightBraceToken, RightBracketToken, RightParanToken } from "./tokens/bracket";
import { CommaToken } from "./tokens/comma";
import { CommentToken } from "./tokens/comment";
import { EofToken } from "./tokens/eof";
import { IdentifierToken } from "./tokens/identifier";
import { ElseToken, IfToken } from "./tokens/ifElse";
import { NumberToken } from "./tokens/number";
import { AssignOperatorToken, DivideOperatorToken, EqualOperatorToken, MinusOperatorToken, MultiplyOperatorToken, NotEqualOperatorToken, PercentOperatorToken, PlusOperatorToken } from "./tokens/operator";
import { SemicolonToken } from "./tokens/semicolon";
import { StringToken } from "./tokens/string";
import { UnknownToken } from "./tokens/unknown";
import { WhitespaceToken } from "./tokens/whitespace";

const tokenMap: Record<TokenType, { new(...args: any): Token<TokenType> }> = {
    [TokenType.UNKNOWN]: UnknownToken,
    
    [TokenType.EOF]: EofToken,

    [TokenType.WHITESPACE]: WhitespaceToken,
    [TokenType.COMMENT]: CommentToken,

    [TokenType.NUMBER]: NumberToken,
    [TokenType.STRING]: StringToken,

    [TokenType.LEFT_PAREN]: LeftParanToken,
    [TokenType.RIGHT_PAREN]: RightParanToken,
    [TokenType.LEFT_BRACE]: LeftBraceToken,
    [TokenType.RIGHT_BRACE]: RightBraceToken,
    [TokenType.LEFT_BRACKET]: LeftBracketToken,
    [TokenType.RIGHT_BRACKET]: RightBracketToken,

    [TokenType.OP_ASSIGN]: AssignOperatorToken,
    [TokenType.OP_EQUAL]: EqualOperatorToken,
    [TokenType.OP_NOT_EQUAL]: NotEqualOperatorToken,

    [TokenType.OP_PLUS]: PlusOperatorToken,
    [TokenType.OP_MINUS]: MinusOperatorToken,
    [TokenType.OP_MULTIPLY]: MultiplyOperatorToken,
    [TokenType.OP_DIVIDE]: DivideOperatorToken,
    [TokenType.OP_PERCENT]: PercentOperatorToken,

    [TokenType.OP_LESS_THAN]: UnknownToken,
    [TokenType.OP_LESS_THAN_EQUAL]: UnknownToken,
    [TokenType.OP_GREATER_THAN]: UnknownToken,
    [TokenType.OP_GREATER_THAN_EQUAL]: UnknownToken,

    [TokenType.COMMA]: CommaToken,
    [TokenType.SEMICOLON]: SemicolonToken,

    [TokenType.OP_AND]: UnknownToken,
    [TokenType.OP_OR]: UnknownToken,

    [TokenType.TRUE]: TrueToken,
    [TokenType.FALSE]: FalseToken,

    [TokenType.IF]: IfToken,
    [TokenType.ELSE]: ElseToken,

    [TokenType.LOOP]: UnknownToken,

    [TokenType.RETURN]: UnknownToken,

    [TokenType.IDENTIFIER]: IdentifierToken,

}
