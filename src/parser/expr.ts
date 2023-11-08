// +
// -
// *
// /
// %

import { Tokenizer } from "../tokenizer";
import { TokenType } from "../tokenizer/token/TokenType";
import { PlusOperatorToken } from "../tokenizer/token/tokens/operator";

const operatorPrecedence = {
    [TokenType.NUMBER]: 200,
    [TokenType.OP_MULTIPLY]: 100,
    [TokenType.OP_PLUS]: 50,
}

const str = '1 + 2 * 3 + 5 * 4 + 5 * 3';

const tokenizer = new Tokenizer(str);
tokenizer.tokenize();

const tokens = tokenizer.getTokens().filter((t) => t.type !== TokenType.WHITESPACE);
let pos = 0;

console.log(tokens);

const ast = parseExpression();

console.dir(ast, { depth: null });
console.log(ast.toString());

function current() {
    return tokens[pos];
}

function forward() {
    pos++;
}

function parseExpression(precedence = 0) {
    let left = parseLiteral();

    while (current() && (precedence < (operatorPrecedence[current().type as keyof typeof operatorPrecedence]))) {
        if (current()?.type === TokenType.OP_PLUS) {
            left = parsePlus(left);
        }
        if (current()?.type === TokenType.OP_MULTIPLY) {
            left = parseMultiply(left);
        }
    }

    return left;
}

function parseInfix(left: any) {
    switch (current().type) {
        case TokenType.OP_PLUS:
            return 
    }
}

function parsePlus(left: any) {
    const token = current() as PlusOperatorToken;
    forward();

    return {
        type: 'PlusExpression',
        op: '+',
        left,
        right: parseExpression(operatorPrecedence[token.type]),
        toString() {
            return `(${this.left.toString()} ${this.op} ${this.right.toString()})`
        }
    }
}

function parseMultiply(left: any): any {
    const token = current() as PlusOperatorToken;
    forward();

    return {
        type: 'MultipleExpression',
        op: '*',
        left,
        right: parseExpression(operatorPrecedence[token.type]),
        toString() {
            return `(${this.left.toString()} ${this.op} ${this.right.toString()})`
        }
    }
}

function parseLiteral(): any {
    const _current = current();
    switch (_current.type) {
        case TokenType.NUMBER:
            forward();
            return {
                type: 'NumberLiteral', 
                value: _current.value,
                toString() {
                    return this.value;
                }
            };
        case TokenType.STRING:
            forward();
            return {
                type: 'StringLiteral', 
                value: _current.value,
                toString() {
                    return this.value;
                }
            };
        case TokenType.TRUE:
        case TokenType.FALSE:
            forward();
            return {
                type: 'BooleanLiteral',
                vvalue: _current.value,
                toString() {
                    return this.value;
                }
            };
        default:
            throw '리터럴이 아닙니다';
    }
}