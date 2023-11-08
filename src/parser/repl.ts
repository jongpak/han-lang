import readline from 'readline';
import stringWidth from 'string-width';
import { Tokenizer } from '../tokenizer';
import { Parser } from './Parser';
import { findLine } from '../utils/findLine';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Han> ',
});

rl.prompt();

rl.on('line', (line) => {
    if (!line) {
        rl.prompt();
        return;
    }

    const tokenizer = new Tokenizer(line);
    tokenizer.tokenize();

    const parser = new Parser(tokenizer.getTokens());
    parser.parse();

    console.log('<< Token >>')
    console.log(tokenizer.getTokens());
    console.log();

    console.log('<< AST >>');
    console.dir(parser.getAst(), { maxArrayLength: null, depth: null });
    console.log();

    console.log('<< Parsed Code >>');
    console.log(parser.getAst().map((node) => node.toString()).join('\n'));
    console.log();

    console.log('<< ERRORS >>');
    console.log(parser.getErrors());
    parser.getErrors().forEach((error) => {
        console.log(`(line: ${error.token.position.row + 1}, col: ${error.token.position.col + 1}) - ${error.message}`);
    
        const errorLine = findLine(line, error.token.position.pos);
        const errorStart = stringWidth(errorLine.substring(0, error.token.position.col));
    
        console.log();
        console.log(`    ${errorLine}`);
        console.log(`    ${''.padEnd(errorStart) + '^'}`);
        console.log();
    });

    console.log();

    rl.prompt();
});
