enum TokenType {
    UNKNOWN = 'UNKNOWN',

    EOF = 'EOF',

    /*
     * 기본 토큰
     *
     */

    /** \n, \r, \t, ' ' */
    WHITESPACE = 'WHITESPACE',

    /** // ... */
    COMMENT = 'COMMENT',

    /** [0-9] */
    NUMBER = 'NUMBER',

    /** "..." */
    STRING = 'STRING',

    /** 참 */
    TRUE = 'TRUE',
    /** 거짓 */
    FALSE = 'FALSE',

    /*
     * 괄호 토큰
     */

    /** ( */
    LEFT_PAREN = 'LEFT_PAREN',
    /** ) */
    RIGHT_PAREN = 'RIGHT_PAREN',
    /** { */
    LEFT_BRACE = 'LEFT_BRACE',
    /** } */
    RIGHT_BRACE = 'RIGHT_BRACE',
    /** [ */
    LEFT_BRACKET = 'LEFT_BRACKET',
    /** ] */
    RIGHT_BRACKET = 'RIGHT_BRACKET',

    /**
     * 연산자 토큰
     */

    /** = */
    OP_ASSIGN = 'OP_ASSIGN',
    /** == */
    OP_EQUAL = 'OP_EQUAL',
    /** != */
    OP_NOT_EQUAL = 'OP_NOT_EQUAL',

    /** + */
    OP_PLUS = 'OP_PLUS',
    /** - */
    OP_MINUS = 'OP_MINUS',
    /** * */
    OP_MULTIPLY = 'OP_MULTIPLY',
    /** / */
    OP_DIVIDE = 'OP_DIVIDE',
    /** % */
    OP_PERCENT = 'OP_PERCENT',

    /** < */
    OP_LESS_THAN = 'OP_LESS_THAN',
    /** <= */
    OP_LESS_THAN_EQUAL = 'OP_LESS_THAN_EQUAL',
    /** > */
    OP_GREATER_THAN = 'OP_GREATER_THAN',
    /** >= */
    OP_GREATER_THAN_EQUAL = 'OP_GREATER_THAN_EQUAL',

    /** && */
    OP_AND = 'OP_AND',
    /** || */
    OP_OR = 'OP_OR',

    /** , */
    COMMA = 'COMMA',

    /** ; */
    SEMICOLON = 'SEMICOLON',

    /** 만약 */
    IF = 'IF',
    /** 아니면 */
    ELSE = 'ELSE',

    /** 반복 */
    LOOP = 'LOOP',

    /** 반환 */
    RETURN = 'RETURN',

    /** [ㄱ-ㅣ가-힣a-zA-Z_]+[ㄱ-ㅣ가-힣a-zA-Z_0-9]* */
    IDENTIFIER = 'IDENTIFIER',
}

export { TokenType };
