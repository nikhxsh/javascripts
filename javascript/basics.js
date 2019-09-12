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


console.h2('Scope');
console.comment(`
    Scope refers to the lifecycle of a variable, i.e. where in the code it’s visible and for
    how long.
`);
console.code(`
    {
        // This is a block
    }
    // This is not part a block
`);
console.comment(`
    - But in ES5 JavaScript we only have two scopes, the global scope and function scope.
    - The variable a, as we’ve declared it below, exists in global scope so this means it’s visible from
      everywhere in our application.
`);
{
    var a = "block";
}
console.code(`
    {
        var a = "block";
    }
    console.log(a);
`);
console.log(`>> ${a}`);
console.comment(`
    - In ES5 apart from global scope, the only other scope is function scope,so if we wrote.
    - we get Uncaught ReferenceError: a is not defined(…),This is because the a variable is declared inside a function 
    and is therefore only visible inside that function, trying to access it outside the function results in an error
`);
function hello1() {
    var b = "function";
}
console.code(`
    function hello() {
        var b = "function";
    }
    hello();
    console.log(b); //Uncaught ReferenceError: b is not defined(…)
`);
hello1();
function hello2() {
    var c = "function";
    for (var i = 0; i < 5; i++) {
        var c = "block";
    }
    console.log('>> ' + c); //Prints block
}
console.code(`
    function hello() {
        var c = "function";
        for (var i = 0; i < 5; i++) {
            var c = "block";
        }
    }
    console.log(c); //Prints block
`);
hello2();
console.comment(`
    - What gets printed out here is block not function despite the fact we are outside the for loop, that’s
    because the body of the for loop is not its own scope.
    - This issue of no block level scope has plagued JavaScript developers since its inception.
    - One common workaround in the past has been to use something called an Immediately Invoked
    Function Expression (IIFE) like
`);
function hello3() {
    var d = "function";
    for (var i = 0; i < 5; i++) {
        (function () {
            var d = "block";
        })();
    }
    console.log('>> ' + d);
}
console.code(`
    function hello() {
        var d = "function";
        for (var i = 0; i < 5; i++) {
            (function () {
                var d = "block";
            })();
        }
        console.log(d);
    }

    hello();
`);
hello3();


console.comment(`
    - In below example, for loop executes first, setTimeout after 1s delay looks for the i value, which is 5, 
      and then outputs four times, one for each loop iteration.
`);
function timeoutFunction() {
    for (i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log('>> ' + i);
        }, 1000);
    }
}
console.code(`
    function timeoutFunction() {
        for (i = 0; i < 5; i++) {
            setTimeout(function () {
                console.log('>> ' + i);
            }, 1000);
        }
    }
    timeoutFunction(); //It will print 4, 4, 4, 4, 4
`);
//timeoutFunction();

console.comment(`
    - Above problem can be solved with IIFE
`);
function timeoutFunctionIIFE() {
    for (var i = 0; i < 5; i++) {
        (function(index) {
            setTimeout(function() { console.log('>> ' + index) }, 1000);
        })(i);
    }
}
console.code(`
    function timeoutFunctionIIFE() {
        for (var i = 0; i < 5; i++) {
            (function(index) {
                setTimeout(function() { console.log('>> ' + index) }, 1000);
            })(i);
        }
    }
    timeoutFunctionIIFE(); //It will print 0, 1, 2, 3, 4
`);
//timeoutFunctionIIFE();

console.comment(`
    - Since functions have their own scope, using an IIFE has the same effect as if we had block level
    scope, the variable a inside the IIFE isn’t visible outside the IIFE.
    - So with ES6 we now have the new let keyword, we use it in place of the var keyword and it creates 
    a variable with block level scope
`);
function hello4() {
    var e = "function";
    for (var i = 0; i < 5; i++) {
        let e = "block";
    }
    console.log('>> ' + e);
}
console.code(`
    function hello4() {
        var e = "function";
        for (var i = 0; i < 5; i++) {
            let e = "block";
        }
        console.log(e); //prints out function as expected
    }

    hello();
`);
hello4();
console.comment(`
    - Using let in for loop
    - Output of below code is > 4 4 4 4 4
    - The reason for this is that the variable y is not block level, it doesn’t only exist inside its enclosing {}
      In fact it’s a global variable and by the time any of the functions are called it’s already been set to 5.
`);
var funcs = [];
for (var i = 0; i < 5; i += 1) {
    var y = i;
    funcs.push(function () {
        console.log('>> ' + y);
    })
}
console.code(`
    var funcs = [];
    for (var i = 0; i < 5; i += 1) {
        var y = i;
        funcs.push(function () {
            console.log(y);
        })
    }
    funcs.forEach(function (func) {
        func()
    });
`);
funcs.forEach(function (func) {
    func()
});
console.comment(`
    - In the above example if we replace var y = i with let y = i then the variable y only exists inside also we can use
      for (let i = 0; i < 5; i += 1)
    - Even though let i = 0 is strictly declared outside of the for block { }, any variables declared in the
      for loop expression with let has block level scope in the for loop.
`);
var funcs = [];
for (let i = 0; i < 5; i += 1) {
    funcs.push(function () {
        console.log('>> ' + i);
    })
}
console.code(`
    var funcs = [];
    for (let i = 0; i < 5; i += 1) {
        funcs.push(function () {
            console.log(i);
        })
    }
    funcs.forEach(function (func) {
        func()
    });
`);
funcs.forEach(function (func) {
    func()
});

console.comment(`
    - Both let and const create variables that are block-scoped – they only exist within the innermost
      block that surrounds them.
    - Variables created by let and var are mutable: (Mutable in this case means can change over time.)
      Variables created by const however are immutable, they don’t change over time, specifically the the
      const variable can’t point to another thing later on.
`);
console.code(`
    const foo = 'abc';
    foo = 'def'; // TypeError: Assignment to constant variable
`);
console.comment(`
    -  But we can however mutate, make changes to, the object foo points to, like below:
`);
const foo = {};
foo['prop'] = "Moo"; // This works!
console.code(`
    const foo = {};
    foo['prop'] = "Moo"; // This works!    
    console.log(foo.prop);
`);
console.log('>> ' + foo.prop);
console.comment(`
    - If we want the value of foo to be immutable we have to freeze it using Object.freeze(…).
    - To force Object.freeze(…) to throw an error we must remember to be in "use strict" mode, like so:
       "use strict";
        const foo = Object.freeze({});
        foo.prop = 123; // SyntaxError: Identifier 'foo' has already been declared
`);
const foo1 = Object.freeze({});
foo1.prop1 = 123;
console.code(`
    const foo1 = Object.freeze({});
    foo.prop = 123;    
    console.log(foo.prop); //undefined
`);
console.log('>> ' + foo.prop1);


console.h2('Destructuring');
console.comment(`
    - Object Destructuring is a way of extracting values into variables from data stored in objects and arrays.
`);
const destructuring = { first: 'Adolf', last: 'lol', age: 39 };
const { first, last } = destructuring;
console.code(`
    const destructuring = {first: 'Adolf', last: 'lol', age: 39 };
    const { first, last } = destructuring;
`);
console.log('first >> ' + first);
console.log('last >> ' + last);
console.comment(`
    - Array destructuring works in a similar way except it extracts based of the index in the array, like so:
`);
const arr = ['a', 'b'];
const [m, n] = arr;
console.code(`
    const arr = ['a', 'b'];
    const [m, n] = arr;
`);
console.log('m >> ' + m);
console.log('n >> ' + n);
console.comment(`
    - One really useful use case for destructuring is in function parameters.
`);
function f(options) {
    console.log(`>> ${options.x},${options.y}`);
}
console.code(`
    function f(options) {
        console.log(\`>> \${options.x},\${options.y}\`);
    }
    f({ x: 1, y: 2 });
`);
f({ x: 1, y: 2 });
console.comment(`
    - Now we can define the function parameter list as an object destructure pattern,
    - In addition to that when using destructured function parameters we can also provide default values
`);
function f1({ x, y = 9 }) {
    console.log(`>> ${x},${y}`);
}
console.code(`
    function f({x, y = 9}) {
        console.log(\`>> \${x},\${y}\`);
    }

    f({ x:0 });
`);
f1({ x: 0 });

console.h2('For loop');
console.comment(`
    - With ES5 JavaScript we can also use the forEach method on the Array class,
`);
let array = [1, 2, 3];
console.code(`
    let array = [1,2,3];
    array.forEach(function (value) {
      console.log(value);
    });
`);
array.forEach(function (value) {
    console.log('>> ' + value);
});
console.comment(`
    - It’s slightly shorter but has a few downsides:
        1. You can’t break out of this loop using a break statement or move to the next iteration with
        continue.
        2. You can’t return from the enclosing function using a return statement.
    - The for-in loop  is designed for iterating over an objects properties, like so
`);
var obj = { a: 1, b: 2 };
console.code(`
    var obj = {a:1,b:2};
    for (let prop in obj) {
    console.log(prop);
    }
`);
for (let prop in obj) {
    console.log('>> ' + prop);
}
console.comment(`
    - If we tried to use it with an array, it might initially look like it’s working
    - But if we tried to print out the type of index, The index variable is a string and not a number, 
      using for-in with arrays converts the index to a string.
    - The for–in loop is for looping over object properties.
`);
let numbers = [10, 20, 30];
console.code(`
    let numbers = [10, 20, 30];
    for (let index in numbers) {
        console.log(\`\${typeof (index)} : \${index}: \${numbers[index]}\`);
    };
`);
for (let index in numbers) {
    console.log(`>> ${typeof (index)} : ${index} : ${numbers[index]}`);
};
console.comment(`
    - Rather than change the way the for-in loops work in ES6 and in the process create a breaking
      change, instead in ES6 we have a new syntax called for-of.
      • This is the most concise way of looping through array elements.
      • It avoids all the pitfalls of for–in.
      • It works with break, continue, and return
    - The for–of loop is for looping over the values in an array.
    - for–of is not just for arrays. It also works on most array-like objects including the new Set and Map
`);
console.code(`
    for (var value of numbers) {
        console.log(value);
    }
`);
for (var value of numbers) {
    console.log(`>> ${value}`);
}