import { Token } from "../tokenizer/token/Token";
import { TokenType } from "../tokenizer/token/TokenType";
import { FalseToken, TrueToken } from "../tokenizer/token/tokens/boolean";
import { CommentToken } from "../tokenizer/token/tokens/comment";
import { EofToken } from "../tokenizer/token/tokens/eof";
import { IdentifierToken } from "../tokenizer/token/tokens/identifier";
import { NumberToken } from "../tokenizer/token/tokens/number";
import { AssignOperatorToken, DivideOperatorToken, MinusOperatorToken, MultiplyOperatorToken, PlusOperatorToken } from "../tokenizer/token/tokens/operator";
import { SemicolonToken } from "../tokenizer/token/tokens/semicolon";
import { StringToken } from "../tokenizer/token/tokens/string";
import { WhitespaceToken } from "../tokenizer/token/tokens/whitespace";
import { ParseError } from "./ParseError";
import { TreeNode } from "./ast/TreeNode";
import { AssignmentStatement } from "./ast/node/statement/AssignmentStatement";
import { UnknownSyntax } from "./ast/node/UnknownSyntax";
import { BooleanLiteral } from "./ast/node/literal/BooleanLiteral";
import { NumberLiteral } from "./ast/node/literal/NumberLiteral";
import { StringLiteral } from "./ast/node/literal/StringLiteral";
import { Identifier } from "./ast/node/Identifier";
import { MultiplyExpression } from "./ast/node/expression/MultiplyExpression";
import { DivideExpression } from "./ast/node/expression/DivideExpression";
import { PlusExpression } from "./ast/node/expression/PlusExpression";
import { MinusExpression } from "./ast/node/expression/MinusExpression";
import { LeftBraceToken, LeftParanToken, RightParanToken } from "../tokenizer/token/tokens/bracket";
import { FunctionCallExpression } from "./ast/node/expression/FunctionCallExpression";
import { FunctionDeclareExpression } from "./ast/node/expression/FunctionDeclareExpression";
import { CommaToken } from "../tokenizer/token/tokens/comma";

const operatorPrecedence = {
    [TokenType.NUMBER]:      1_000,
    [TokenType.STRING]:      1_000,
    [TokenType.TRUE]:        1_000,
    [TokenType.FALSE]:       1_000,
    [TokenType.IDENTIFIER]:  1_000,

    [TokenType.OP_MULTIPLY]:   900,
    [TokenType.OP_DIVIDE]:     900,
    
    [TokenType.OP_PLUS]:       800,
    [TokenType.OP_MINUS]:      800,

    [TokenType.OP_EQUAL]:       500,
    [TokenType.OP_NOT_EQUAL]:   500,

    [TokenType.LEFT_PAREN]:    100,
}

class Parser {
    private tokens: Token<TokenType>[];

    private _position = 0;

    private ast: TreeNode[] = [];

    private errors: ParseError[] = [];

    constructor(tokens: Token<TokenType>[]) {
        this.tokens = tokens.filter((token) =>
            !(token instanceof WhitespaceToken) && !(token instanceof CommentToken));
    }

    public parse() {
        while (!this.isFinish()) {
            this.skipNonCodeToken();

            if (this.processAssignmentStatement()) {
                continue;
            }

            if (this.isFinish()) {
                break;
            }

            this.ast.push(new UnknownSyntax(this.current()));
            this.errors.push(new ParseError(
                `해석할 수 없는 형식입니다`,
                this.current(),
            ));
            this.forward();
        }
    }

    private processAssignmentStatement() {
        const left = this.current();
        const op = this.peek(1);

        if (op instanceof AssignOperatorToken) {
            this.forward();

            if (left instanceof IdentifierToken) {
                this.forward();

                const functionDeclareExpression = this.parseFunctionDeclareExpression();
                if (functionDeclareExpression) {
                    // 함수 표현식
                    this.ast.push(
                        new AssignmentStatement(
                            op,
                            new Identifier(left),
                            functionDeclareExpression,
                        )
                    );
                } else {
                    // 일반 표현식
                    this.ast.push(
                        new AssignmentStatement(
                            op,
                            new Identifier(left),
                            this.parseExpression()
                        )
                    );
                }

                if (this.current() instanceof SemicolonToken) {
                    this.forward();
                    return true;
                } else {
                    this.errors.push(new ParseError(
                        '세미콜론이 없습니다',
                        this.current(),
                    ));
                    this.forward();
                    return true;
                }
            } else {
                this.errors.push(new ParseError(
                    '할당문의 왼쪽에는 식별자가 와야합니다',
                    this.current(),
                ));
                this.forward();
                return true;
            }
        }

        return false;
    }

    private parseFunctionDeclareExpression() {
        // return null;
        const token = this.current();
        if (!(token instanceof LeftParanToken)) {
            return;
        }

        let peekCount = 1;

        const parameters: IdentifierToken[] = [];

        while (this.peek(peekCount)) {
            if (this.peek(peekCount) instanceof RightParanToken) {
                peekCount++;
                break;
            }
            if (this.peek(peekCount) instanceof IdentifierToken) {
                parameters.push(this.peek(peekCount) as IdentifierToken);
                peekCount++;

                if (this.peek(peekCount) instanceof CommaToken) {
                    peekCount++;
                    continue;
                }
                if (this.peek(peekCount) instanceof RightParanToken) {
                    peekCount++;
                    console.log('!!!');
                    break;
                }
            }

            // 함수 정의 표현식 아님
            return;
        }

        // 함수 정의 표현식 아님
        if (!(this.peek(peekCount) instanceof LeftBraceToken)) {
            return;
        }
        peekCount++;

        this.forward(peekCount);
        
        const body: TreeNode[] = [];

        return new FunctionDeclareExpression(token, parameters, body);
    }

    /**
     * 표현식 파싱
     *
     */
    private parseExpression(precedence = 0) {
        // 전위 표현식
        let left = this.parsePrefix();

        // 중위 표현식
        while (this.current() && (precedence < (operatorPrecedence[this.current().type as keyof typeof operatorPrecedence]))) {
            left = this.parseInfix(left);
        }

        return left;
    }

    /**
     * 전위 연산자
     *
     */
    private parsePrefix() {
        const current = this.current();
        switch (current.type) {
            case TokenType.NUMBER:
            case TokenType.STRING:
            case TokenType.TRUE:
            case TokenType.FALSE:
                return this.parseLiteral();
            case TokenType.IDENTIFIER:
                return this.parseIdentifier();
        }

        this.forward();
        this.errors.push(new ParseError('알수없는 구문입니다', current));
        return new UnknownSyntax(current);
    }

    private parseIdentifier() {
        const current = this.current();
        if (current instanceof IdentifierToken) {
            this.forward();
            return new Identifier(current);
        }

        this.forward();
        this.errors.push(new ParseError('식별자가 와야합니다', current));
        return new UnknownSyntax(current);
    }

    private parseLiteral() {
        const current = this.current();
        switch (current.type) {
            case TokenType.NUMBER:
                return this.parseNumberLiteral();
            case TokenType.STRING:
                return this.parseStringLiteral();
            case TokenType.TRUE:
            case TokenType.FALSE:
                return this.parseBooleanLiteral();
        }

        this.forward();
        this.errors.push(new ParseError('리터럴 타입이 와야합니다', current));
        return new UnknownSyntax(current);
    }

    private parseNumberLiteral() {
        const current = this.current();
        if (current instanceof NumberToken) {
            this.forward();
            return new NumberLiteral(current);
        }

        this.forward();
        this.errors.push(new ParseError('숫자가 와야합니다', current));
        return new UnknownSyntax(current);
    }

    private parseStringLiteral() {
        const current = this.current();
        if (current instanceof StringToken) {
            this.forward();
            return new StringLiteral(current);
        }

        this.forward();
        this.errors.push(new ParseError('문자가 와야합니다', current));
        return new UnknownSyntax(current);
    }

    private parseBooleanLiteral() {
        const current = this.current();
        if (current instanceof TrueToken || current instanceof FalseToken) {
            this.forward();
            return new BooleanLiteral(current);
        }

        this.forward();
        this.errors.push(new ParseError('참 또는 거짓이 와야합니다', current));
        return new UnknownSyntax(current);
    }

    /**
     * 중위 연산자
     *
     */
    private parseInfix(left: TreeNode) {
        const current = this.current();
        switch (current.type) {
            case TokenType.OP_MULTIPLY:
                return this.parseInfixMultiply(left);
            case TokenType.OP_DIVIDE:
                return this.parseInfixDivide(left);
            case TokenType.OP_PLUS:
                return this.parseInfixPlus(left);
            case TokenType.OP_MINUS:
                return this.parseInfixMinus(left);
            case TokenType.LEFT_PAREN:
                return this.parseInfixFunctionCall(left);
        }

        this.forward();
        this.errors.push(new ParseError('알수 없는 연산자 입니다', current));
        return new UnknownSyntax(current);
    }

    private parseInfixMultiply(left: TreeNode) {
        const current = this.current();
        if (current instanceof MultiplyOperatorToken) {
            this.forward();
            return new MultiplyExpression(
                current,
                left,
                this.parseExpression(operatorPrecedence[current.type]),
            );
        } else {
            this.forward();
            this.errors.push(new ParseError('곱셈 기호가 와야합니다', current));
            return new UnknownSyntax(current);
        }
    }

    private parseInfixDivide(left: TreeNode) {
        const current = this.current();
        if (current instanceof DivideOperatorToken) {
            this.forward();
            return new DivideExpression(
                current,
                left,
                this.parseExpression(operatorPrecedence[current.type]),
            );
        } else {
            this.forward();
            this.errors.push(new ParseError('나눗셈 기호가 와야합니다', current));
            return new UnknownSyntax(current);
        }
    }

    private parseInfixPlus(left: TreeNode) {
        const current = this.current();
        if (current instanceof PlusOperatorToken) {
            this.forward();
            return new PlusExpression(
                current,
                left,
                this.parseExpression(operatorPrecedence[current.type]),
            );
        } else {
            this.forward();
            this.errors.push(new ParseError('덧셈 기호가 와야합니다', current));
            return new UnknownSyntax(current);
        }
    }

    private parseInfixMinus(left: TreeNode) {
        const current = this.current();
        if (current instanceof MinusOperatorToken) {
            this.forward();
            return new MinusExpression(
                current,
                left,
                this.parseExpression(operatorPrecedence[current.type]),
            );
        } else {
            this.forward();
            this.errors.push(new ParseError('뻘샘 기호가 와야합니다', current));
            return new UnknownSyntax(current);
        }
    }

    private parseInfixFunctionCall(left: TreeNode) {
        const idenfitier = left;
        const current = this.current();
        if (current instanceof LeftParanToken) {
            if (idenfitier instanceof Identifier) {
                this.forward();

                const parameters = this.parseFunctionCallParameters();
                return new FunctionCallExpression(
                    current,
                    idenfitier,
                    parameters,
                );
            } else {
                this.forward();
                this.errors.push(new ParseError('올바른 함수명이 아닙니다', idenfitier.token));
                return new UnknownSyntax(idenfitier.token);
            }
        }  else {
            this.forward();
            this.errors.push(new ParseError('함수호출 시작 괄호가 와야합니다', current));
            return new UnknownSyntax(current);
        }
    }

    private parseFunctionCallParameters() {
        const parameters: TreeNode[] = [];

        if (this.current().type === TokenType.RIGHT_PAREN) {
            this.forward();
            return parameters;
        }
        
        while (true) {
            const parameter = this.parseExpression();
            parameters.push(parameter);

            const current = this.current();
            if (current.type === TokenType.COMMA) {
                this.forward();
            } else if (current.type === TokenType.RIGHT_PAREN) {
                this.forward();
                break;
            } else {
                this.forward();
                this.errors.push(new ParseError('잘못된 함수 파라미터입니다. 콤마 또는 닫기 괄호가 와야합니다', current));
                parameters.push(new UnknownSyntax(current));
            }
        }
        return parameters;
    }

    public getAst() {
        return this.ast;
    }

    public getErrors() {
        return this.errors;
    }

    private skipNonCodeToken() {
        while (!this.isFinish()) {
            if (this.current() instanceof WhitespaceToken) {
                this.forward();
                continue;
            }
            if (this.current() instanceof CommentToken) {
                this.forward();
                continue;
            }
            break;
        }
    }

    private current() {
        return this.tokens[this._position] || this.tokens[this.tokens.length - 1];
    }

    private peek(offset: number = 0) {
        return this.tokens[this._position + offset];
    }

    private forward(count: number = 1) {
        while (count > 0) {
            this.forwardOnce();
            count--;
        }
    }

    private forwardOnce() {
        this._position++;
    }

    private isFinish() {
        return this.current() === undefined || this.current() instanceof EofToken;
    }
}

export { Parser };
