const console = require('./utils');

console.h1('JavaScript Basics');

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
		(function (index) {
			setTimeout(function () { console.log('>> ' + index) }, 1000);
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
        }"
        console.log(e); //prints "function" as expected
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