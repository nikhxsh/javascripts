const console = require('./utils');

console.h1('Basics of Javascript');
console.log(`  Template literals 'Half of 100 is \${100 / 2}' = ${`Half of 100 is ${100 / 2}`}`);

console.h2(`Automatic type conversion (type coercion)`);
console.log(`  8 * null = ${8 * null}`, `null becomes zero`);
console.log(`  '5' - 1 = ${'5' - 1}`, `'5' becomes 5`);
console.log(`  '5' + 1 = ${'5' + 1}`, `string concatination`);
console.log(`  'five' * 2 = ${'five' * 2}`, `'five' doesn't map to any number hence NaN`);
console.log(`  true * 'monkey' = ${true * 'monkey'}`);
console.log(`  true - 'monkey' = ${true - 'monkey'}`);
console.log(`  true / 'monkey' = ${true / 'monkey'}`);
console.log(`  true + 'monkey' = ${true + 'monkey'}`);
console.log(`  'monkey' + true = ${'monkey' + true}`);
console.log(`  true + 1 = ${true + 1 }`);
console.log(`  false + 1 = ${false + 1 }`);
console.log(`  true + true = ${true + true }`);
console.log(`  true * true = ${true * true }`);
console.log(`  true - true = ${true - true }`);
console.log(`  'monkey' * 'monkey' = ${'monkey' * 'monkey'}`);

console.h2(`Operators`);
console.log(`  null == undefined = ${null == undefined}`, `null & undefined evaluated as false`);
console.log(`  NaN == false = ${NaN == false}`, `NaN evaluated as false`);
console.log(`  null == false = ${null == false}`, `Null evaluated as false`);
console.log(`  0 == false = ${0 == false}`, `0 evaluated as false`);
console.log(`  '' == false = ${'' == false}`, `empty strings '' and "" evaluated as false`);
console.log(`  '' === false = ${'' === false}`, `=== when you do not want type conversion to happen`);
console.log(`  '' !== false = ${'' !== false}`, `!== when you do not want type conversion to happen`);
console.log(`  typeof of 'hello' & 4.5 = ${typeof "hello"} & ${typeof 4.5}`);
console.log(`  null || 'User' = ${null || 'User'}`, `short-circuit evaluation: Default if Null`);
console.log(`  'Nik' || 'User' = ${'Nik' || 'User'}`);
console.log(`  '' || -1 = ${'' || -1}`, `As '' is false`);
console.log(`  0 || -1 = ${'' || -1}`, `As 0 is false`);
console.log(`  true || 'Nik' = ${true || 'Nik'}`, `As first one true, second one will be skipped`);
console.log(`  3 > 2 = ${3 > 2}`);
console.log(`  3 < 2 = ${3 < 2}`);
console.log(`  'Aardvark' < 'Zoroaster' = ${'Aardvark' < 'Zoroaster'}`);
console.log(`  'Z' < 'a' = ${'Z' < 'a'}`, `uppercase letters are always “less” than lowercase ones`);
console.log(`  'Z' < '1' = ${'Z' < '1'}`);
console.log(`  'Z' < '!' = ${'Z' < '!'}`);
console.log(`  NaN < NaN = ${NaN < NaN}`);
console.log(`  NaN > NaN = ${NaN > NaN}`);
console.log(`  NaN == NaN = ${NaN == NaN}`);

console.h2('Bindings:');

let mood = 'light';
console.log(`  Mood is: ${mood}`);
mood = 'Dark';
console.log(`  Mood after binding is: ${mood}`);

let one = 1, two = 2;
console.log(`  Addition of variable one & two is: ${one + two}`);

// console.promt.question('   What is the weather like? > ', (answer) => {
//     switch (answer) {
//         case "rainy":
//         console.log(`  Remember to bring an umbrella.`);
//         break;
//         case "sunny":
//         console.log(`  Dress lightly.`);
//         case "cloudy":
//         console.log(`  Go outside.`);
//         break;
//         default:
//         console.log(`  Unknown weather type!`);
//         break;
//     }  
//     console.promt.close();
// });