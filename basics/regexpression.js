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

console.log(`/\\d+/.test('In 1990') >> ${/\d+/.test('In 1990')}`, `(n+) Means “one or more”, the same as {1,}`);
console.log(`/\\d+/.test('In 1') >> ${/\d+/.test('In 1')}`);
console.log(`/\\d+/.test('In') >> ${/\d+/.test('In')}`);

console.log(`/\\d*/.test('In 1990') >> ${/\d*/.test('In 1990')}`, `(n*) Means “zero or more”, the same as {0,}, i.e. n may repeat any times or be absent`);
console.log(`/\\d*/.test('In 1') >> ${/\d*/.test('In 1')}`);
console.log(`/\\d*/.test('In') >> ${/\d*/.test('In')}`);

console.log(`/\\d?/.test('In 1990') >> ${/\d?/.test('In 1990')}`, '(n?) Means “zero or one”, the same as {0,1}');
console.log(`/\\d?/.test('In 1') >> ${/\d?/.test('In 1')}`);
console.log(`/\\d?/.test('In') >> ${/\d?/.test('In')}`);

console.log(`/b?d/.test('bread') >> ${/b?d/.test('bread')}`);
console.log(`/b?d/.test('bd') >> ${/b?d/.test('bd')}`);
console.log(`/b?d/.test('b') >> ${/b?d/.test('b')}`);

console.log(`/\\d{1,2}-\\w{1,3}-\\{1,4} \\d{1,2}:\\d{1,2}/.test('01-JAN-2003 15:20') >> ${/\d{1,2}-\w{1,3}-\d{1,4} \d{1,2}:\d{1,2}/.test('01-JAN-2003 15:20')}`, '{n} for precise number of times');
console.log(`/\\d{1,2}-\\w{1,2}-\\{1,4} \\d{1,2}:\\d{1,2}/.test('01-JAN-2003 15:20') >> ${/\d{1,2}-\w{1,2}-\d{1,4} \d{1,2}:\d{1,2}/.test('01-JAN-2003 15:20')}`);

console.log(`/boo+(hoo+)+/i.test('Boohoooohoohooo') >> ${/boo+(hoo+)+/i.test('Boohoooohoohooo')}`, '(i) for case insensitive');
console.log(`/\\b\\d+ (pig|cow|chicken)s?\b/.test("15 pigs") >> ${/\b\d+ (pig|cow|chicken)s?\b/.test("15 pigs")}`, '(\\b) Find a match at the beginning/end of a word');

console.log(`/[0-9]/.test('1234') >> ${/[0-9]/.test('1234')}`, '[0-9] Any character in a range of characters');
console.log(`/[0-9]/.test('ABC') >> ${/[0-9]/.test('ABC')}`);
console.log(`/[a-zA-Z]/.test('1234xyZ') >> ${/[a-zA-Z]/.test('1234xyZ')}`);
console.log(`/[a-zA-X]/.test('1234Z') >> ${/[a-zA-X]/.test('1234Z')}`);

console.log(`/[a-z]{2,4}/.test('aZxy12') >> ${/[a-z]{2,4}/.test('aZxy12')}`, 'x{2,4} Two to four occurrences');
console.log(`/[a-z]{2,4}/.test('a1') >> ${/[a-z]{2,4}/.test('a1')}`);

console.log(`/(abc)/.test('abcxyabc') >> ${/(abc)/.test('abcxyabc')}`, '(abc) A group');
console.log(`/(abc)/.test('abxcxyaxbc') >> ${/(abc)/.test('abxcxyaxbc')}`);

console.log(`/(ab|ac|bc)/.test('the accountant') >> ${/(ab|ac|bc)/.test('the accountant')}`, 'a|b|c Any one of several patterns');
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

console.h2('Greedy and lazy quantifiers');
console.log(`'a "witch" and her "broom" is one'.match(/".+"/g) >> ${'a "witch" and her "broom" is one'.match(/".+"/g)}`);
console.comment(`
    - Greedy search
    - To find a match, the regular expression engine uses the following algorithm:
      > For every position in the string
      > Match the pattern at that position.
      > If there’s no match, go to the next position.
    - Instead of finding two matches "witch" and "broom", it finds one >> "witch" and her "broom".
      1 The first pattern character is a quote ". then tries to find it at the zero position of the source string : "
      2 The quote is detected then tries to see if the rest of the subject string conforms to .+" 
        In our case the next pattern character is . (a dot). It denotes “any character except a newline”, so the next string letter 'w' : "W
      3 Then the dot repeats because of the quantifier .+. The regular expression engine builds the match by taking characters one by one 
        while it is possible. : witch" and her "broom" is one
      4 Now the engine finished repeating for .+ and tries to find the next character of the pattern. It’s the quote ". But there’s a problem: 
        the string has finished, there are no more characters!
      5 The regular expression engine understands that it took too many .+ and starts to backtrack.
      6 So the engine decreases the number of repetitions of .+ by one more character:until the rest of the pattern (in our case '"')
        So the first match is : "witch" and her "broom"
`);
console.log(`'a "witch" and her "broom" is one'.match(/".+?"/g) >> ${'a "witch" and her "broom" is one'.match(/".+?"/g)}`);
console.comment(`
    - Lazy mode
    - Correct output
      1 The first step is the same: it finds the pattern start '"' at the 3rd position: "
      2 The next step is also similar: the engine finds a match for the dot '.': "w
      3 And now the search goes differently. Because we have a lazy mode for +?, the engine doesn’t try to match a dot one more time, 
        but stops and tries to match the rest of the pattern '"' 
      4 Then the regular expression engine increases the number of repetitions for the dot and tries one more time
        Failure again. Then the number of repetitions is increased again and again… : "Wi
      5 …Till the match for the rest of the pattern is found: "Witch"
      6 The next search starts from the end of the current match and yield one more result i.e. from step 1
`);
console.log(`'a "witch" and her "broom" is one'.match(/"[^"]+"/g) >> ${'a "witch" and her "broom" is one'.match(/"[^"]+"/g)}`, 'looks for [^"]+ it stops the repetitions when it meets the closing quote');

console.h2('String start ^ and finish $');
let str1 = 'Mary had a little lamb, it\'s fleece was white as snow';
let str2 = 'Everywhere Mary went, the lamp was sure to go Mary';
console.log(`${str1}.match(/^Mary/)} >> ${str1.match(/^Mary/)}`, '(^) matches at the beginning of the text');
console.log(`${str2}.match(/^Mary/)} >> ${str2.match(/^Mary/)}`);

console.log(`${str1}.match(/Mary$/)} >> ${str1.match(/Mary$/)}`, '($) matches at the end of the text');
console.log(`${str2}.match(/Mary$/)} >> ${str2.match(/Mary$/)}`);

console.log(`${str1}.match(/^Mary$/)} >> ${str1.match(/^Mary$/)}`, 'both anchors together to check whether the string exactly follows the pattern');
console.log(`${str2}.match(/^Mary$/)} >> ${str2.match(/^Mary$/)}`);

console.log(`'#abcdef'.match(/^#[0-9a-f]{6}$/i)} >> ${'#abcdef'.match(/^#[0-9a-f]{6}$/i)}`);
console.log(`'#abcdefg'.match(/^#[0-9a-f]{6}$/i)} >> ${'#abcdefg'.match(/^#[0-9a-f]{6}$/i)}`);

console.h2('Searching at position');
let str3 = "(text before) function ...";
let regexp = /function/y;
regexp.lastIndex = 5;
console.code(`
    let str3 = "(text before) function ...";
    let regexp = /function/y;
    regexp.lastIndex = 5;
`);
console.log(`regexp.exec(str3)} >> ${regexp.exec(str3)}`);
regexp.lastIndex = 14;
console.code(`
    regexp.lastIndex = 14;
`);
console.log(`regexp.exec(str3)} >> ${regexp.exec(str3)}`);

console.h2('Multiline mode');
let str4 = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;
console.code(`
    let str = \`1st place: Winnie
    2nd place: Piglet
    33rd place: Eeyore\`;
`);
console.log(`str4.match(/^\d+/g)} >> ${str4.match(/^\d+/g)}`);
console.log(`str4.match(/^\d+/gm)} >> ${str4.match(/^\d+/gm)}`,'go for each line by tag m');
console.log(`str4.match(/\w+$/gim)} >> ${str4.match(/\w+$/gim)}`);
console.log(`str4.match(/\w+\\n/gim)} >> ${str4.match(/\w+\n/gim)}`,'Winnie\\n,Piglet\\n');