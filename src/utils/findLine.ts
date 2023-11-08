function findLine(str: string, pos: number) {
    let start = pos;
    let end = pos;

    while (str[start] !== undefined) {
        if (str[start - 1] === '\n') {
            break;
        }
        start--;
    }
    while (str[end] !== undefined) {
        end++;
        if (str[end + 1] === '\n') {
            break;
        }
    }

    if (start === end) {
        return str;
    }

    return str.substring(start, end);
}

export { findLine };
