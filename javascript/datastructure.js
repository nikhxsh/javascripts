const console = require('./utils');

console.h1('Data Structures');

console.h2('DataSet');
let sequence = [1, 2, 3, 4, 5];
let statement = 'O,k,a,y!';
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
console.log(`  statement.split(' ') = ${statement.split(',')}`);
console.log(`  sequence.join(' ') = ${sequence.join(',')}`);
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