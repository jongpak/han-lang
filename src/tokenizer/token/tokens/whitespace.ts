import { Token } from "../Token";
import { TokenType } from "../TokenType";

class WhitespaceToken extends Token<TokenType.WHITESPACE, '\n' | '\r' | '\t' | ' '> {
    public readonly type = TokenType.WHITESPACE;

    public toString() {
        const escapedValue = this.value
            .replace('\n', '\\n')
            .replace('\r', '\\r')
            .replace('\t', '\\t');
        return `'${escapedValue}' (${this.type})`;
    }
}

export { WhitespaceToken };
