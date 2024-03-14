import type { TokenErrorType } from 'types';

function TokenError({ name, value, mode, err }: TokenErrorType) {
    console.log(`\x1b[1;91mError: \x1b[0;32m\t${mode} \x1b[0;30m> \x1b[32m${name}:${value}\n\t\x1b[30mmsg:\x1b[0;33m ${err.message}\x1b[0m\n`);
}

export {
    TokenError
};