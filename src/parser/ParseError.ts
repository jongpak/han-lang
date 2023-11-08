import { Token } from "../tokenizer/token/Token";
import { TokenType } from "../tokenizer/token/TokenType";

class ParseError {
    public readonly message: string;

    public readonly token: Token<TokenType>;

    constructor(message: string, token: Token<TokenType>) {
        this.message = message;
        this.token = token;
    }
}

export { ParseError };
