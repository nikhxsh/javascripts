const gen = require('./colors');
const readline = require('readline')

exports.h1 = function (input) {
    console.log(gen.colors.FgBlack, gen.colors.BgGreen, input, gen.colors.Reset, '\n');
}

exports.h2 = function (input) {
    console.log(gen.colors.FgGreen, gen.colors.Underscore, input, gen.colors.Reset, '\n');
}

exports.log = function (input, note) {
    let notes = note ? [gen.colors.FgYellow, `// ${note}\n`, gen.colors.Reset] : ['\n'];
    console.log(gen.colors.FgMagenta, `   ${input}`, ...notes, gen.colors.Reset);
}

exports.code = function (input) {
    console.log(gen.colors.FgLGray, input, gen.colors.Reset);
}

exports.comment = function (input) {
    console.log(gen.colors.FgYellow, `   /**\n${input}\n    **/\n`, gen.colors.Reset);
}

exports.promt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  exports.promt.pause(); //Comment it during read operations