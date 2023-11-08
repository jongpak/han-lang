import readline from 'readline';
import { Tokenizer } from './Tokenizer';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.prompt();

rl.on('line', (line) => {
    const tokenizer = new Tokenizer(line);
    tokenizer.tokenize();

    console.log(tokenizer.getTokens());

    rl.prompt();
});
