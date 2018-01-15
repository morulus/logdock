/* RegEx from https://github.com/chalk/ansi-regex/blob/master/index.js, but with excluding style codes.
First, I excludes [^m] at last characters set, and exclude (?=\\u001B) to prevent tail matching.
*/

const pattern = () => new RegExp('(\\u001B[[\\d]+m)|(?:[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-lntqry=><~])))', 'g');

module.exports = input => typeof input === 'string' ? input.replace(pattern(), '$1') : input;
