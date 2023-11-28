const console = require('./utils');

console.h1('Data Types & Structures');

console.h2('Data types');
console.comment(`
  Seven data types that are primitives:
    > Boolean
    > Null
    > Undefined
    > Number
    > BigInt
    > String
    > Symbol
   and Object
`);

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
console.log(`  true + 1 = ${true + 1}`);
console.log(`  false + 1 = ${false + 1}`);
console.log(`  true + true = ${true + true}`);
console.log(`  true * true = ${true * true}`);
console.log(`  true - true = ${true - true}`);
console.log(`  'monkey' * 'monkey' = ${'monkey' * 'monkey'}`);

console.h2(`Operators`);
console.log(`  null == undefined = ${null == undefined}`, `null & undefined evaluated as false`);
console.log(`  NaN == false = ${NaN == false}`);
console.log(`  NaN !== NaN = ${NaN !== NaN}`, `NaN compares unequal (via ==, !=, ===, and !==) to any other value`);
console.log(`  NaN === NaN = ${NaN === NaN}`);
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

console.h2('DataSet');
let sequence = [1, 2, 3, 4, 5];
let statement = 'O,k,a,y!';
console.log(`  let sequence = [1, 2, 3, 4, 5];`);
console.log(`  let statement = 'O,k,a,y!';`);

console.log(`  sequence = ${sequence}`);
console.log(`  sequence[0] = ${sequence[0]}`);
console.log(`  sequence.length = ${sequence.length}`);
sequence.push(6);
console.log(`  sequence.push(6) = ${sequence}`);
sequence.pop();
console.log(`  sequence.pop() = ${sequence}`);
console.log(`  sequence.slice(2,4) = ${sequence.slice(2, 4)}`);
console.log(`  sequence.slice(2) = ${sequence.slice(2)}`);
console.log(`  Math.max(...sequence) = ${Math.max(...sequence)}`, 'Rest parameters');

console.h2('Strings');
console.log(`  'Okay!  '.trim() = ${'  Okay!  '.trim()}`);
console.log(`  String(6).padStart(3, "0")) = ${String(6).padStart(3, "0")}`);
console.log(`  statement.split(',') = ${statement.split(',')}`);
console.log(`  sequence.join(',') = ${sequence.join(',')}`);
console.log(`  'Fuck Off!'.repeat(5) = ${'Fuck Off!'.repeat(5)}`);

console.h2('Map & Set');
console.comment(`
    - Map is a new data structure introduced in ES6 which lets you map keys to values without the
      drawbacks of using Objects
    - A distinction between Object and Map is that Maps record the order in which
      elements are inserted. It then replays that order when looping over keys, values or entries.
`);
let map = new Map()
	.set("A", 1)
	.set("B", 2)
	.set("C", 3);
console.code(`
    let map = new Map()
        .set("A", 1)
        .set("B", 2)
        .set("C", 3);
`);
console.comment(`
    - we could initialise the Map with a an array of key-value pairs
`);
console.code(`
    let map = new Map([
        [ "A", 1 ],
        [ "B", 2 ],
        [ "C", 3 ]
    ]);
`);
console.log(`map.get("A") >> ${map.get("A")}`);
console.log(`map.has("A") >> ${map.has("A")}`);
console.log(`map.delete("A") >> ${map.delete("A")}`);
console.log(`map.has("A") >> ${map.has("A")}`);
console.log(`map.size >> ${map.size}`);

console.code(`
    for (let key of map.keys()) {
        console.log(key);
    }
`);
for (let key of map.keys()) {
	console.log('>> ' + key);
}

console.code(`
    for (let value of map.values()) {
        console.log(value);
    }
`);
for (let value of map.values()) {
	console.log('>> ' + value);
}

console.code(`
    for (let entry of map.entries()) {
        console.log(\`>> \${entry[0]}:\${entry[1]}\`);
    }
`);
for (let entry of map.entries()) {
	console.log(`>> ${entry[0]}:${entry[1]}`);
}

console.code(`
    for (let [key, value] of map.entries()) {
        console.log(\`>> \${key}:\${value}\`);
    }
`);
for (let [key, value] of map.entries()) {
	console.log(`>> ${key}:${value}`);
}

console.comment(`
    - Sets are a bit like maps but they only store keys not key-value pairs.
    - Sets can only store unique values, so adding a value a second time has no effect
    - Similar to Maps, Sets also record the order in which elements are inserted, it then
      replays that order when looping.
`);
let set = new Set()
	.add('APPLE')
	.add('ORANGE')
	.add('MANGO');
console.code(`
    let set = new Set()
        .add('APPLE')
        .add('ORANGE')
        .add('MANGO');
    or

    let set = new Set(['APPLE', 'ORANGE', 'MANGO']);
`);
console.log(`set.has('APPLE') >> ${set.has('APPLE')}`);
console.log(`set.size >> ${set.size}`);
console.log(`set.add('APPLE'); :  set.size >> ${set.size}`);
console.code(`
    for (let entry of set) {
        console.log(\`>> \${entry}\`);
    }
`);
for (let entry of set) {
	console.log(`>> ${entry}`);
}