const console = require('./utils');

console.h1('Functions');

console.h2('Strict Mode');

console.comment(`
    - JavaScript can be made a little stricter by enabling strict mode. This is done by putting the string "use strict" at the top 
      of a file or a function body
`);

function canYouSpotTheProblem() {
    //"use strict";
    for (counter = 0; counter < 5; counter++) {
        console.log("Happy happy");
    }
}
console.code(`
    function canYouSpotTheProblem() {
        "use strict";
        for (counter = 0; counter < 10; counter++) {
            console.log("Happy happy");
        }
    }    
   canYouSpotTheProblem(); //Will give "ReferenceError: counter is not defined" for strict mode
`);


console.h2('Normal Functions');
const square = function (x) {
    return x * x;
};
console.code(`
    const square = function (x) {
        return x * x;
    };
 `);
console.log(`square.name >> ${square.name}`,'returns function name');
console.log(`square.length >> ${square.length}`,'returns the number of function parameters');
console.log(`square(12) >> ${square(12)}`);

const squarex = function (x) {
    return;
};
console.code(`
    const squarex = function (x) {
        return;
    };
 `);
console.log(`squarex(12) >> ${squarex(12)}`, 'A return keyword without an expression after it will cause the function to return undefined');
//Prints undefined

console.h2('Lexical Scoping & Function Closure');
const outerFunction1 = function () {
    let parentVarible = 10;
    const innerFunction = function () {
        let localVarible = 10;
        parentVarible += localVarible;
        console.log(`>> Value 10 Increamented by ${localVarible}, new value ${parentVarible}`);
    }
    innerFunction();
}
console.code(`
    const outerFunction1 = function () {
        let parentVarible = 10;
        const innerFunction = function () {
            let localVarible = 10;
            parentVarible += localVarible;
            console.log(\`Value 10 Increamented by \${localVarible}, new value \${parentVarible}\`);
        }
        innerFunction();
    }

    outerFunction1();
    outerFunction1();
 `);
outerFunction1();
outerFunction1();

console.comment(`    
    - The code inside the innerFunction function can see the factor binding from the outer function.    
      But its local bindings, such as is localVarible not visible in the outer function.
    - The set of bindings visible inside a block is determined by the place of that block in the program text. 
      Each local scope can also see all the local scopes that contain it, and all scopes can see the global scope. 
    - This approach to binding visibility is called lexical scoping.
`);
const outerFunction2 = function () {
    let parentVarible = 11;
    const innerFunction = function () {
        let localVarible = 11;
        parentVarible += localVarible;
        console.log(`>> Value 10 Increamented by ${localVarible}, new value ${parentVarible}`);
    }
    return innerFunction;
}
console.code(`
    const outerFunction2 = function () {
        let parentVarible = 11;
        const innerFunction = function () {
            let localVarible = 11;
            parentVarible += localVarible;
            console.log(\`Value 11 Increamented by \${localVarible}, new value \${parentVarible}\`);
        }
        return innerFunction;
    }

    var functionClosure1 = outerFunction2();
    functionClosure1();
    var functionClosure2 = outerFunction2();
    functionClosure2();
 `);

var functionClosure1 = outerFunction2();
functionClosure1();
var functionClosure2 = outerFunction2();
functionClosure2();

console.comment(`
    - A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain or A function that references bindings from
      local scopes around it is called a closure.

    - The closure has three scope chains: 
        it has access to its own scope (variables defined between its curly brackets), 
        it has access to the outer function’s variables, and 
        it has access to the global variables

    - The inner function has access not only to the outer function’s variables, but also to the outer function’s parameters.

    - Note that the inner function cannot call the outer function’s arguments object, however, even though it can call the outer 
      function’s parameters directly.

    - This situation is a good demonstration of the fact that local bindings are created anew for every call, and different calls can’t trample on
      one another’s local bindings.
`);

console.h2('Function as Value');
console.code(`
    let launchMissiles = function() {
        missileSystem.launch("now");
    };
    if (safeMode) {
        launchMissiles = function() {/* do nothing */};
   }
 `);
console.comment(`
    - It is possible to store a function value in a new binding, pass it as an argument to a function, and so on. Similarly, 
      a binding that holds a function is still just a regular binding and can, if not constant, be assigned a new value
`);

console.h2('Arrow Function');
console.comment(`
    - There’s a third notation for functions, which looks very different from the others. Instead of the function keyword, 
      it uses an arrow (=>) made up of an equal sign and a greater-than character (not to be confused with the greaterthan-
      or-equal operator, which is written >=).
`);
console.code(`
    const power = (base, exponent) => {
      let result = 1;
      for (let count = 0; count < exponent; count++) {
        result *= base;
      }
     return result;
    };
 `);

console.h2('Recursion');
console.code(`
    const power = (base, exponent) => {
      if (exponent == 0) {
        return 1;
      } else {
        return base * power(base, exponent - 1);
      }
    };
`);

console.h2('Higher-order functions');
console.comment(`
    - Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.
      Higher-order functions allow us to abstract over actions, not just values 
      They come in several forms. For example, we can have functions that create new functions.
`);

let noisy = function (f) {
    return (...args) => {
        let result = f(...args);
        console.log(`>> Called with ${args} & returned result ${result}`);
        return result;
    }
};
console.code(`
    let noisy = function(f){
        return (...args) => {
            console.log('Calling with \${args}');
            let result = f(...args);
            console.log('Called with \${args} & returned result \${result}');
            return result;
        }
    };
`);
console.log(`noisy(Math.min)(4, 7, 9) >> ${noisy(Math.min)(4, 7, 9)}`);

let reduce = function (array, combine, start) {
    let current = start;
    for (let element of array) {
        current = combine(current, element);
    }
    return current;
};
console.code(`
    let reduce = function (array, combine, start){
        let current = start;
        for (let element in array){
            current = combine(current,element);
        }
        return current;
    };
`);
console.log(`reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0) >> ${reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0)}`,'(a, b) => a + b is higher order operation');

console.h2('Constructor functions');
console.comment(`
    - to create an instance of a given class, you have to make an object that derives from the proper prototype, but you also have to make sure it, 
      itself, has the properties that instances of this class are supposed to have. This is what a constructor function does.
    - If you put the keyword new in front of a function call, the function is treated asa constructor.
`);

function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function (line) {
    console.log(`>> The ${this.type} rabbit says '${line}'`);
};
console.comment(`
    - The value of "this" is defined at run-time.
        > When a function is declared, it may use this, but that this has no value until the function is called.
        > That function can be copied between objects.
        > When a function is called in the “method” syntax: object.method(), the value of this during the call is object.
        > Please note that arrow functions are special: they have no this. When this is accessed inside an arrow function, 
          it is taken from outside.
`);

let weirdRabbit = new Rabbit("weird");
console.code(`
    function Rabbit(type) {
        this.type = type;
    }

    Rabbit.prototype.speak = function (line) {
        console.log(\`The \${this.type} rabbit says '\${line}\'\`);
    };

    let weirdRabbit = new Rabbit("weird");
    weirdRabbit.speak('SKREEEE!!');
`);
weirdRabbit.speak('SKREEEE!!');

console.h2('Generators');
console.comment(`
    - The ability of functions to be paused and then resumed again is not exclusive to async functions. JavaScript also has a feature called generator 
      functions. These are similar, but without the promises.
    - When you call a generator, it returns an iterator
`);

function* powers(n) {
    for (let current = n; ; current *= n) {
        yield current;
    }
}
console.code(`
    function* powers(n) {
        for (let current = n; ; current *= n) {
            yield current;
        }
    }
    
    for (let power of powers(3)) {
        if (power > 50) break;
        console.log(power);
    }
`);
for (let power of powers(3)) {
    if (power > 50) break;
    console.log(`>> ${power}`);
}
