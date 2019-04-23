const console = require('./utils');

console.h1('Regular Expressions');
console.comment(`
    - A regular expression is a type of object. It can be either constructed with the RegExp constructor 
      or written as a literal value by enclosing a pattern in forward slash (/) characters.
`);
console.code(`
    let re1 = new RegExp('abc');
    let re2 = /abc/;
`);

console.h2('Metacharacters, Quantifiers, Modifiers & Patterns');
console.log(`/abc/.test('abcde') >> ${/abc/.test('abcde')}`, `An 'a' character followed by a 'b' followed by a 'c'`);
console.log(`/abc/.test('abxac') >> ${/abc/.test('abxac')}`);
console.log(`/[0-9]/.test('In 1990') >> ${/[0-9]/.test('In 1990')}`, 'hyphen (-) between two characters used to indicate a range of characters');

console.comment(`
    - A number of common character groups have their own built-in shortcuts. Digits are one of them: \d means the same thing as [0-9].    
        \\b	Find a match at the beginning/end of a word
        \\B	Find a match not at the beginning/end of a word
        \\d Any digit character
        \\D	Find a non-digit character
        \\w An alphanumeric character (“word character”)
        \\s Any whitespace character (space, tab, newline, and similar)
        \\S	Find a non-whitespace character
        \\0	Find a NUL character
        \\n	Find a new line character
        \\f	Find a form feed character
        \\r	Find a carriage return character
        \\t	Find a tab character
        \\v	Find a vertical tab character
        . Any character except for newline
        ^ Start of input
        $ End of input
`);

console.log(`/[\\d]/.test('In 1990') >> ${/[0-9]/.test('In 1990')}`, '[] is character class');
console.log(`/[\\d]/.test('Top Ten') >> ${/[0-9]/.test('Top Ten')}`);
console.log(`/\\d\\d-\\d\\d-\\d\\d\\d\\d \\d\\d:\\d\\d/.test('01-30-2003 15:20') >> ${/\d\d-\d\d-\d\d\d\d \d\d:\d\d/.test('01-30-2003 15:20')}`);
console.log(`/\\d\\d-\\d\\d-\\d\\d\\d\\d \\d\\d:\\d\\d/.test('01-JAN-2003 15:20') >> ${/\d\d-\d\d-\d\d\d\d \d\d:\d\d/.test('01-JAN-2003 15:20')}`);
console.log(`/\\d\d-\\w\\w\\w-\\d\\d\\d\\d \\d\\d:\\d\\d/.test('01-JAN-2003 15:20') >> ${/\d\d-\w\w\w-\d\d\d\d \d\d:\d\d/.test('01-JAN-2003 15:20')}`);

console.log(`/[^01]/.test('1100100010100110') >> ${/[^01]/.test('1100100010100110')}`, `match any character except the ones in the set`);
console.log(`/[^01]/.test('1100100010200110') >> ${/[^01]/.test('1100100010200110')}`);

console.log(`/\\d+/.test('In 1990') >> ${/\d+/.test('In 1990')}`, `(n+) Matches any string that contains at least one n`);
console.log(`/\\d+/.test('In 1') >> ${/\d+/.test('In 1')}`);
console.log(`/\\d+/.test('In') >> ${/\d+/.test('In')}`);

console.log(`/\\d*/.test('In 1990') >> ${/\d*/.test('In 1990')}`, `(n*) Matches any string that contains zero or more occurrences of n`);
console.log(`/\\d*/.test('In 1') >> ${/\d*/.test('In 1')}`);
console.log(`/\\d*/.test('In') >> ${/\d*/.test('In')}`);

console.log(`/\\d?/.test('In 1990') >> ${/\d?/.test('In 1990')}`, '(n?) Matches any string that contains zero or one occurrences of n');
console.log(`/\\d?/.test('In 1') >> ${/\d?/.test('In 1')}`);
console.log(`/\\d?/.test('In') >> ${/\d?/.test('In')}`);

console.log(`/b?d/.test('bread') >> ${/b?d/.test('bread')}`);
console.log(`/b?d/.test('bd') >> ${/b?d/.test('bd')}`);
console.log(`/b?d/.test('b') >> ${/b?d/.test('b')}`);

console.log(`/\\d{1,2}-\\w{1,3}-\\{1,4} \\d{1,2}:\\d{1,2}/.test('01-JAN-2003 15:20') >> ${/\d{1,2}-\w{1,3}-\d{1,4} \d{1,2}:\d{1,2}/.test('01-JAN-2003 15:20')}`, '{n} for precise number of times');
console.log(`/\\d{1,2}-\\w{1,2}-\\{1,4} \\d{1,2}:\\d{1,2}/.test('01-JAN-2003 15:20') >> ${/\d{1,2}-\w{1,2}-\d{1,4} \d{1,2}:\d{1,2}/.test('01-JAN-2003 15:20')}`);

console.log(`/boo+(hoo+)+/i.test('Boohoooohoohooo') >> ${/boo+(hoo+)+/i.test('Boohoooohoohooo')}`, '(i) for case insensitive');
console.log(`/\\b\\d+ (pig|cow|chicken)s?\b/.test("15 pigs") >> ${/\b\d+ (pig|cow|chicken)s?\b/.test("15 pigs")}`, '(\\b) Find a match at the beginning/end of a word');

console.log(`/[0-9]/.test('1234') >> ${/[0-9]/.test('1234')}`,'[0-9] Any character in a range of characters');
console.log(`/[0-9]/.test('ABC') >> ${/[0-9]/.test('ABC')}`);
console.log(`/[a-zA-Z]/.test('1234xyZ') >> ${/[a-zA-Z]/.test('1234xyZ')}`);
console.log(`/[a-zA-X]/.test('1234Z') >> ${/[a-zA-X]/.test('1234Z')}`);

console.log(`/[a-z]{2,4}/.test('aZxy12') >> ${/[a-z]{2,4}/.test('aZxy12')}`,'x{2,4} Two to four occurrences');
console.log(`/[a-z]{2,4}/.test('a1') >> ${/[a-z]{2,4}/.test('a1')}`);

console.log(`/(abc)/.test('abcxyabc') >> ${/(abc)/.test('abcxyabc')}`,'(abc) A group');
console.log(`/(abc)/.test('abxcxyaxbc') >> ${/(abc)/.test('abxcxyaxbc')}`);

console.log(`/(ab|ac|bc)/.test('the accountant') >> ${/(ab|ac|bc)/.test('the accountant')}`,'a|b|c Any one of several patterns');
console.log(`/(ab|ac|bc)/.test('the abcountant') >> ${/(ab|ac|bc)/.test('the abcountant')}`);
console.log(`/(ab|ac|bc)/.test('the bccountant') >> ${/(ab|ac|bc)/.test('the bccountant')}`);
console.log(`/(ab|ac|bc)/.test('the adcountant') >> ${/(ab|ac|bc)/.test('the adcountant')}`);

console.h2('Matches and groups');
console.log(`/\\d+/.exec("one two 100") >> ${/\d+/.exec("one two 100")}`, 'exec (execute) method that will return null if no match was found else return an object');
console.log(`/\\d+/.exec("one two 100").index >> ${/\d+/.exec("one two 100").index}`);

console.comment(`
    - When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array.
    - The whole match is always the first element. The next element is the part matched by the first group
`);
console.log(`/'([^']*)'/.exec("she said 'hello'") >> ${/'([^']*)'/.exec("she said 'hello'")}`, '(^n) Matches any string with n at the beginning of it');
console.comment(`
    - When a group does not end up being matched at all (for example, when followed by a question mark), its position in the output 
      array will hold undefined.
    - Similarly, when a group is matched multiple times, only the last match ends up in the array.
`);
console.log(`/bad(ly)?/.exec("badly") >> ${/bad(ly)?/.exec("bad")}`, 'bad, undefined');
console.log(`/bad(ly)*/.exec("badly") >> ${/bad(ly)*/.exec("bad")}`, 'bad, undefined');
console.log(`/bad(ly)+/.exec("badly") >> ${/bad(ly)+/.exec("bad")}`);
console.log(`/(\\d)+/.exec("123") >> ${/(\d)+/.exec("123")}`);
console.log(`/(\\d{1,2})-(\\d{1,2})-(\\d{4})/.exec('1-30-2003') >> ${/(\d{1,2})-(\d{1,2})-(\d{4})/.exec('1-30-2003')}`);

console.h2('Replace');
console.log(`'Borobudur'.replace(/[ou]/, "a") >> ${'Borobudur'.replace(/[ou]/, "a")}`, 'Only one match is replaced');
console.log(`'Borobudur'.replace(/[ou]/g, "a") >> ${'Borobudur'.replace(/[ou]/g, "a")}`, '(g global) All matches replaced');
console.log(`'Liskov, Barbara'.replace(/(\\w+), (\\w+)/g, '$2 $1') >> ${'Liskov, Barbara'.replace(/(\\w+), (\\w+)/g, '$2 $1')}`);
console.log(`'the cia and fbi'.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()) >> ${'the cia and fbi'.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase())}`);

console.h2('Looping over matches');
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b\d+\b/g;
let match;
console.code(`
    let input = "A string with 3 numbers in it... 42 and 88.";
    let number = /\\b\\d+\\b/g;
    let match;
    while (match = number.exec(input)) {
        console.log(\`Found, \${match[0]}, at, \${match.index}\`);
    }
`);
while (match = number.exec(input)) {
    console.log(`Found, ${match[0]}, at, ${match.index}`);
}