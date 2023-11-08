import { Token } from "../Token";
import { TokenType } from "../TokenType";

class AssignOperatorToken extends Token<TokenType.OP_ASSIGN, '='> {
    public readonly type = TokenType.OP_ASSIGN;
}

class EqualOperatorToken extends Token<TokenType.OP_EQUAL, '=='> {
    public readonly type = TokenType.OP_EQUAL;
}

class NotEqualOperatorToken extends Token<TokenType.OP_NOT_EQUAL, '!='> {
    public readonly type = TokenType.OP_NOT_EQUAL;
}

class PlusOperatorToken extends Token<TokenType.OP_PLUS, '+'> {
    public readonly type = TokenType.OP_PLUS;
}

class MinusOperatorToken extends Token<TokenType.OP_MINUS, '-'> {
    public readonly type = TokenType.OP_MINUS;
}

class MultiplyOperatorToken extends Token<TokenType.OP_MULTIPLY, '*'> {
    public readonly type = TokenType.OP_MULTIPLY;
}

class DivideOperatorToken extends Token<TokenType.OP_DIVIDE, '/'> {
    public readonly type = TokenType.OP_DIVIDE;
}

class PercentOperatorToken extends Token<TokenType.OP_PERCENT, '%'> {
    public readonly type = TokenType.OP_PERCENT;
}

export {
    AssignOperatorToken,
    EqualOperatorToken,
    NotEqualOperatorToken,
    PlusOperatorToken,
    MinusOperatorToken,
    MultiplyOperatorToken,
    DivideOperatorToken,
    PercentOperatorToken,
};
