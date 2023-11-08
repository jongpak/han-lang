import { TokenType } from "./TokenType";

abstract class Token<T extends TokenType, V extends string = string> {
    public abstract readonly type: T;
    public readonly value: V;

    public readonly position: {
        pos: number;
        row: number;
        col: number;
    };

    public constructor(value: V, position: Token<T, V>['position']) {
        this.value = value;
        this.position = position;
    }

    public toString() {
        return `'${this.value}' (${this.type})`;
    }
}

export { Token };
