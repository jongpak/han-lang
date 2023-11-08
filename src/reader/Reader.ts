class Reader {
    private str = '';

    /**
     * 0 부터 시작
     */
    private _position = 0;

    /**
     * 0 부터 시작
     */
    private _row = 0;

    /**
     * 0 부터 시작 (글자 기반의 컬럼수임에 주의. 한글이라하더라도 한글 한글자에 대하여 컬럼이 1 증가함)
     */
    private _col = 0;

    constructor(str: string) {
        this.str = str;
    }

    public current() {
        return this.str[this._position];
    }

    public peek(offset: number = 0) {
        return this.str[this._position + offset];
    }

    public peekRange(start: number = 0, end: number) {
        return this.str.substring(this._position + start, this._position + end);
    }

    public forward(count: number = 1) {
        while (count > 0) {
            this.forwardOnce();
            count--;
        }
    }

    private forwardOnce() {
        if (this.current() === '\n') {
            this._row++;
            this._col = 0;
        } else {
            this._col++;
        }

        this._position++;
    }

    public isFinish() {
        return this.current() === undefined;
    }

    public pos() {
        return this._position;
    }

    public row() {
        return this._row;
    }

    public col() {
        return this._col;
    }
}

export { Reader };
