import { Reader } from "../reader/Reader";
import { Token } from "./token/Token";
import { TokenType } from "./token/TokenType";
import { FalseToken, TrueToken } from "./token/tokens/boolean";
import { LeftBraceToken, LeftBracketToken, LeftParanToken, RightBraceToken, RightBracketToken, RightParanToken } from "./token/tokens/bracket";
import { CommaToken } from "./token/tokens/comma";
import { CommentToken } from "./token/tokens/comment";
import { EofToken } from "./token/tokens/eof";
import { IdentifierToken } from "./token/tokens/identifier";
import { ElseToken, IfToken } from "./token/tokens/ifElse";
import { NumberToken } from "./token/tokens/number";
import { AssignOperatorToken, DivideOperatorToken, EqualOperatorToken, MinusOperatorToken, MultiplyOperatorToken, NotEqualOperatorToken, PercentOperatorToken, PlusOperatorToken } from "./token/tokens/operator";
import { SemicolonToken } from "./token/tokens/semicolon";
import { StringToken } from "./token/tokens/string";
import { UnknownToken } from "./token/tokens/unknown";
import { WhitespaceToken } from "./token/tokens/whitespace";

class Tokenizer {
    private reader: Reader;

    private tokens: Token<TokenType>[] = [];

    constructor(str: string) {
        this.reader = new Reader(str);
    }

    public tokenize() {
        while (!this.reader.isFinish()) {
            if (this.processWhitespaceToken()) {
                continue;
            }
            if (this.processCommentToken()) {
                continue;
            }
            if (this.processBracketToken()) {
                continue;
            }
            if (this.processNumberToken()) {
                continue;
            }
            if (this.processStringToken()) {
                continue;
            }
            if (this.processOperatorToken()) {
                continue;
            }
            if (this.processCommaToken()) {
                continue;
            }
            if (this.processBooleanToken()) {
                continue;
            }
            if (this.processIfElseToken()) {
                continue;
            }
            if (this.processIdentifierToken()) {
                continue;
            }
            if (this.processSemicolonToken()) {
                continue;
            }

            this.pushToken(UnknownToken, this.reader.current());
            this.reader.forward();
        }

        this.pushToken(EofToken, '');
    }

    public getTokens() {
        return this.tokens;
    }

    private pushToken<T extends Token<TokenType>, V extends string>(
        $$tokenClass: { new(v: V, p: { pos: number, row: number, col: number }): T },
        value: V
    ) {
        const token = new $$tokenClass(value, {
            pos: this.reader.pos(),
            row: this.reader.row(),
            col: this.reader.col(),
        });
        this.tokens.push(token);
    }

    private processWhitespaceToken() {
        const current = this.reader.current();

        if (current === '\n' || current === '\r' || current === '\t' || current === ' ') {
            this.pushToken(WhitespaceToken, current);
            this.reader.forward();
            return true;
        }

        return false;
    }

    private processCommentToken() {
        let count = 2;

        if (this.reader.peekRange(0, 2) === '//') {
            while (true) {
                if (this.reader.peek(count) && this.reader.peek(count) !== '\n') {
                    count++;
                    continue;
                }
                break;
            }
            this.pushToken(CommentToken, this.reader.peekRange(0, count));
            this.reader.forward(count);
            return true;
        }

        return false;
    }

    private processBracketToken() {
        const current = this.reader.current();

        if (current === '(') {
            this.pushToken(LeftParanToken, current);
            this.reader.forward();
            return true;
        }
        if (current === ')') {
            this.pushToken(RightParanToken, current);
            this.reader.forward();
            return true;
        }

        if (current === '{') {
            this.pushToken(LeftBraceToken, current);
            this.reader.forward();
            return true;
        }
        if (current === '}') {
            this.pushToken(RightBraceToken, current);
            this.reader.forward();
            return true;
        }

        if (current === '[') {
            this.pushToken(LeftBracketToken, current);
            this.reader.forward();
            return true;
        }
        if (current === ']') {
            this.pushToken(RightBracketToken, current);
            this.reader.forward();
            return true;
        }

        return false;
    }

    private processNumberToken() {
        let foundDot = false;
        let count = 1;

        if (/[0-9]/.test(this.reader.current())) {
            while (true) {
                if (!this.reader.peek(count)) {
                    break;
                }
                if (foundDot && this.reader.peek(count) === '.') {
                    break;
                }
                if (!foundDot && this.reader.peek(count) === '.') {
                    foundDot = true;
                    count++;
                    continue;
                }
                if (/[0-9]/.test(this.reader.peek(count))) {
                    count++;
                    continue;
                }
                break;
            }
            this.pushToken(NumberToken, this.reader.peekRange(0, count));
            this.reader.forward(count);
            return true;
        }

        return false;
    }

    private processStringToken() {
        let count = 1;
        let escape = false;
        let complate = false;

        if (this.reader.current() === '"') {
            while (true) {
                if (!this.reader.peek(count)) {
                    break;
                }
                if (this.reader.peek(count) === '\\') {
                    escape = true;
                    count++;
                    continue;
                }
                if (!escape && this.reader.peek(count) === '"') {
                    complate = true;
                    count++;
                    break;
                }
                if (escape) {
                    escape = false;
                }

                count++;
            }
            if (complate) {
                this.pushToken(StringToken, this.reader.peekRange(0, count));
                this.reader.forward(count);
                return true;
            }
        }

        return false;
    }

    private processOperatorToken() {
        const current = this.reader.current();

        if (current === '=') {
            if (this.reader.peekRange(0, 2) === '==') {
                this.pushToken(EqualOperatorToken, this.reader.peekRange(0, 2) as '==');
                this.reader.forward(2);
                return true;
            } else {
                this.pushToken(AssignOperatorToken, current);
                this.reader.forward();
                return true;
            }
        }
        if (current === '!') {
            if (this.reader.peekRange(0, 2) === '!=') {
                this.pushToken(NotEqualOperatorToken, this.reader.peekRange(0, 2) as '!=');
                this.reader.forward(2);
                return true;
            }
        }
        if (current === '+') {
            this.pushToken(PlusOperatorToken, current);
            this.reader.forward();
            return true;
        }
        if (current === '-') {
            this.pushToken(MinusOperatorToken, current);
            this.reader.forward();
            return true;
        }
        if (current === '*') {
            this.pushToken(MultiplyOperatorToken, current);
            this.reader.forward();
            return true;
        }
        if (current === '/') {
            this.pushToken(DivideOperatorToken, current);
            this.reader.forward();
            return true;
        }
        if (current === '%') {
            this.pushToken(PercentOperatorToken, current);
            this.reader.forward();
            return true;
        }

        return false;
    }

    private processCommaToken() {
        const current = this.reader.current();

        if (current === ',') {
            this.pushToken(CommaToken, current);
            this.reader.forward();
            return true;
        }

        return false;
    }

    private processBooleanToken() {
        const current = this.reader.current();

        if (current === '참') {
            this.pushToken(TrueToken, current);
            this.reader.forward();
            return true;
        }
        if (this.reader.peekRange(0, 2) === '거짓') {
            this.pushToken(FalseToken, this.reader.peekRange(0, 2) as '거짓');
            this.reader.forward(2);
            return true;
        }

        return false;
    }

    private processIfElseToken() {
        if (this.reader.peekRange(0, 2) === '만약') {
            this.pushToken(IfToken, this.reader.peekRange(0, 2) as '만약');
            this.reader.forward(2);
            return true;
        }
        if (this.reader.peekRange(0, 3) === '아니면') {
            this.pushToken(ElseToken, this.reader.peekRange(0, 3) as '아니면');
            this.reader.forward(3);
            return true;
        }

        return false;
    }

    private processIdentifierToken() {
        let count = 1;

        if (/[ㄱ-ㅣ가-힣a-zA-Z_]/.test(this.reader.current())) {
            while (true) {
                if (this.reader.peek(count) && /[ㄱ-ㅣ가-힣a-zA-Z_0-9]/.test(this.reader.peek(count))) {
                    count++;
                    continue;
                }
                break;
            }
            this.pushToken(IdentifierToken, this.reader.peekRange(0, count));
            this.reader.forward(count);
            return true;
        }

        return false;
    }

    private processSemicolonToken() {
        const current = this.reader.current();

        if (current === ';') {
            this.pushToken(SemicolonToken, current);
            this.reader.forward();
            return true;
        }

        return false;
    }
}

export { Tokenizer };
