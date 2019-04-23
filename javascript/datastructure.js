const console = require('./utils');

console.h1('Data Structures');

console.h2('DataSet');
let sequence = [1, 2, 3, 4, 5];
console.log(`  sequence = ${sequence}`);
console.log(`  sequence[0] = ${sequence[0]}`);
console.log(`  sequence.length = ${sequence.length}`);
sequence.push(6);
console.log(`  sequence.push(6) = ${sequence}`);
sequence.pop();
console.log(`  sequence.pop() = ${sequence}`);
console.log(`  sequence.slice(2,4) = ${sequence.slice(2, 4)}`);
console.log(`  sequence.slice(2) = ${sequence.slice(2)}`);
console.log(`  Math.max(...sequence) = ${Math.max(...sequence)}`,'Rest parameters');

console.h2('Strings');
console.log(`  'Okay!  '.trim() = ${'  Okay!  '.trim()}`);
console.log(`  String(6).padStart(3, "0")) = ${String(6).padStart(3, "0")}`);
console.log(`  descriptions.statement.split(' ') = ${descriptions.statement.split(' ')}`);
console.log(`  descriptions.events.join(' ') = ${descriptions.events.join(' ')}`);
console.log(`  'Fuck Off!'.repeat(5) = ${'Fuck Off!'.repeat(5)}`);