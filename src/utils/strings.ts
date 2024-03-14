

export function insertString(str: string, sep: string) {
    const arr = str.split(sep);

    function r(ch: string) {
        return arr.join(ch);
    }
    r.str = str;
    r.sep = sep;
    return r;
}