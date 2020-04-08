const console = require('./utils');

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

console.h2('Decorators and forwarding, call/apply');
user.say = function (line) {
	return `${this.name} says ${line}`;
}
let xcachingDecorator = function (func) {
	let cache = new Map();
	return function (x) {
		if (cache.has(x))
			return cache.get(x);
		let result = func(x);
		cache.set(result);
		return result;
	}
}
console.code(`
    user.say = function (line) {
        return \`\${this.name} says \${line}\`;
    }
    let xcachingDecorator = function (func) {
        let cache = new Map();
        return function (x) {
            if (cache.has(x))
                return cache.get(x); 
            let result = func(x); **
            cache.set(result);
            return result;
        }
    }
`);

console.log(`user.say('Bye') >> ${user.say('Bye')}`);
console.log(`user.say = xcachingDecorator(user.say);`);
user.say = xcachingDecorator(user.say);
console.log(`user.say('Hey') >> ${user.say('Hey')}`);
console.log(`user.say('Hey') >> ${user.say('Hey')}`);

console.comment(`
    - you can see the second call after calling xcachingDecorator return undefined
    - The reason is that the wrapper calls the original function as func(x) in the line (**). And, when called like that, 
      the function gets this = undefined
    - So, the wrapper passes the call to the original name property, but without the context this.Hence the error.
    - There’s a special built-in function method func.call(context, …args) that allows to call a function explicitly setting this.
`);

user.say = function (line) {
	return `${this.name} says ${line}`;
}
let ycachingDecorator = function (func) {
	let cache = new Map();
	return function (x) {
		if (cache.has(x))
			return cache.get(x);
		let result = func.call(this, x);
		cache.set(result);
		return result;
	}
}
console.code(`
    user.say = function (line) {
        return \`\${this.name} says \${line}\`;
    }
    let ycachingDecorator = function (func) {
        let cache = new Map();
        return function (x) {
            if (cache.has(x))
                return cache.get(x); 
            let result = func.call(this, x);
            cache.set(result);
            return result;
        }
    }
`);

console.log(`user.say('Bye') >> ${user.say('Bye')}`);
console.log(`user.say = ycachingDecorator(user.say);`);
user.say = ycachingDecorator(user.say);
console.log(`user.say('Hey') >> ${user.say('Hey')}`);
console.log(`user.say('Hey') >> ${user.say('Hey')}`, 'Cached Call');

console.comment(`
    - To make it all clear, let’s see more deeply how this is passed along:
      > After the decoration user.say is now the wrapper function (x) { ... }.
      > So when user.say('Hello') is executed, the wrapper gets 'Hello' as an argument and this=user (it’s the object before dot).
      > Inside the wrapper, assuming the result is not yet cached, func.call(this, x) passes the current this (=user) and the 
        current argument (='Hello') to the original method.
`);

user.translate = function (source, result) {
	return `If ${this.name} says ${source} then its ${result}`;
}
let zcachingDecoratorApply = function (func) {
	let cache = new Map();
	return function () {
		let key = hash(arguments);
		if (cache.has(key))
			return cache.get(key);
		let result = func.apply(this, arguments);
		cache.set(key, result);
		return result;
	}
}
function hash(args) {
	return args[0] + ',' + args[1];
}
console.code(`
    user.translate = function (source, result) {
        return \`>> If \${this.name} says \${source} then its \${result}\`;
    }

    let zcachingDecoratorApply = function (func) {
        let cache = new Map();
        return function () {
            let key = hash(arguments);
            if (cache.has(key))
                return cache.get(key);
            let result = func.apply(this, arguments);
            cache.set(key, result);
            return result;
        }
    }

    function hash(args) {
        return args[0] + ',' + args[1];
    }
`);

console.log(`user.translate('Hi','Oh God!') >> ${user.translate('Hi', 'Oh God!')}`);
console.log(`user.translate = ycachingDecorator(user.translate);`);
user.translate = zcachingDecoratorApply(user.translate);
console.log(`user.translate('Bye','Fuck Off') >> ${user.translate('Bye', 'Fuck Off')}`);
console.log(`user.translate('Bye','Fuck Off') >> ${user.translate('Bye', 'Fuck Off')}`, 'Cached Call');

console.h2('Calling context');
let cc = {
	name: "calling context",
	sayLater: function () {
		setTimeout(function () {
			console.log('Normal Function >> ' + this.name);
		}, 1000);
	}
};
console.code(`
    let cc = {
        name: "calling context",
        sayLater: function () {
            setTimeout(function () {
                console.log('Normal Function >> ' + this.name);
            }, 1000);
        }
    };

    cc.sayLater();
`);
cc.sayLater();

console.comment(`
    - In fact we get undefined printed out to the console.The reason for this is that the value of this in a function 
      depends on how the function is called.
    - In the browser it’s either undefined or the global object depending on if you are running in strict
      mode or not. In node it’s an internal timeout object.
    - In all cases however it isn’t going to be obj, so this.name is not going to return "calling context", it’s going 
      to return undefined or raise an error.
    - In ES5 there are a number of methods we can use to stabilise the value of this. One common solution is to assign 
      this to another variable at the top, usually called self or vm, and then always use self in the function body, 
      like so:
      let self = this;
      console.log(self.name});
    - But in ES6 we can do better, if we use fat arrow functions the value of this inside a fat arrow
      function will be the same as the value of this outside the fat arrow function.
`);
let cc1 = {
	name: "calling context",
	sayLater: function () {
		setTimeout(() => console.log('Fat Arrow Function >> ' + this.name), 1000);
	}
};
console.code(`
    let cc = {
        name: "calling context",
        sayLater: function () {
            setTimeout(() => console.log(this.name), 1000);
        }
    };
    cc.sayLater();
`);
cc1.sayLater();

console.h2('Iterator');
console.comment(`
    - The object given to a for/of loop is expected to be iterable. This means it has a method named with the Symbol.iterator symbol
    - When called, that method should return an object that provides a second interface, iterator. This is the actual thing that iterates. 
      It has a next method that returns the next result.
`);
let okIterator = "OKAY"[Symbol.iterator]();
console.code(`
    let okIterator = "OKAY"[Symbol.iterator]();
`);
console.log(`okIterator.next() >> ${JSON.stringify(okIterator.next())}`);
console.log(`okIterator.next() >> ${JSON.stringify(okIterator.next())}`);
console.log(`okIterator.next() >> ${JSON.stringify(okIterator.next())}`);
console.log(`okIterator.next() >> ${JSON.stringify(okIterator.next())}`);
console.log(`okIterator.next() >> ${JSON.stringify(okIterator.next())}`);

class Shelf {
	constructor(size, element = (z) => undefined) {
		this.size = size;
		this.content = [];
		this.intialise(size, element)
	}

	intialise(size, element) {
		for (let y = 0; y < size; y++) {
			this.content[y] = element(y);
		}
	}

	get(x) {
		return this.content[x];
	}

	set(x, value) {
		this.content[x] = value;
	}
}

class ShelfIterator {
	constructor(shelf) {
		this.x = 0;
		this.shelf = shelf;
	}

	next() {
		if (this.x == this.shelf.size) return { done: true };
		let value = {
			x: this.x,
			value: this.shelf.get(this.x)
		};
		this.x++;
		return { value, done: false };
	}
}

Shelf.prototype[Symbol.iterator] = function () {
	return new ShelfIterator(this);
}

let shelf = new Shelf(5, (z) => `Section ${z}`);

console.code(`
    class Shelf {
        constructor(size, element = (z) => undefined) {
            this.size = size;
            this.content = [];
            this.intialise(size, element)
        }

        intialise(size, element) {
            for (let y = 0; y < size; y++) {
                this.content[y] = element(y);
            }
        }

        get(x) {
            return this.content[x];
        }

        set(x, value) {
            this.content[x] = value;
        }
    }

    class ShelfIterator {
        constructor(shelf) {
            this.x = 0;
            this.shelf = shelf;
        }

        next() {
            if (this.x == this.shelf.size) return { done: true };
            let value = {
                x: this.x,
                value: this.shelf.get(this.x)
            };
            this.x++;
            return { value, done: false };
        }
    }

    Shelf.prototype[Symbol.iterator] = function () {
        return new ShelfIterator(this);
    }

    let shelf = new Shelf(5, (z) => \`Section \${z}\`);

    for (let {x, value} of shelf) {
        console.log(x, value);
    }
`);

for (let { x, value } of shelf) {
	console.log(`>> ${x}: ${value}`);
}

shelf.set(1, 'The Alchemist');
console.code(`
    shelf.set(1, 'The Alchemist');
    console.log('shelf.get(1)');
`);
console.log(`shelf.get(1) >> ${shelf.get(1)}`);

console.h2('Inheritance');
console.comment(`
    - JavaScript’s prototype system makes it possible to create a new class, much like the old class, but with new definitions 
      for some of its properties. The
    - prototype for the new class derives from the old prototype but adds a new definition for, say, the set method.
    - In object-oriented programming terms, this is called inheritance
    - The use of the word extends indicates that this class shouldn’t be directly based on the default Object prototype but on some other class. 
      This is called the superclass. The derived class is the subclass.
`);

class AlbumShelf extends Shelf {
	constructor(size, element = (z) => undefined) {
		super(size, element);
	}

	set(loc, value) {
		let name = super.get(loc);
		super.set(loc, `${name} | Artist:${value}`);
	}
}
let musicShelf = new AlbumShelf(5, (z) => `Album ${z}`);
console.code(`
    class AlbumShelf extends Shelf {
        constructor(size, element = (z) => undefined) {
            super(size, element);
        }

        set (loc, value) {
            let name = super.get(loc);
            super.set(loc, \`\${name} | Artist:\${value}\`);
        }
    }

    let musicShelf = new AlbumShelf(5, (z) => \`Album \${z}\`);
    for (let { x, value } of shelf) {
        console.log(\`\${x}: \${value}\`);
    }
`);

for (let { x, value } of musicShelf) {
	console.log(`${x}: ${value}`);
}

musicShelf.set(1, 'Alan Walker');
console.code(`
    musicShelf.set(1, 'Alan Walker');
`);
console.log(`musicShelf.get(1) >> ${musicShelf.get(1)}`);

console.log(`musicShelf instanceof(Shelf) >> ${musicShelf instanceof (Shelf)}`, 'The instanceof operator');

console.h2('Persistent data');
console.comment(`
    - Data structures that don’t change are called immutable or persistent. They behave a lot like strings and numbers in 
      that they are who they are and stay that way, rather than containing different things at different times.
    - In JavaScript, just about everything can be changed, so working with values that are supposed to be persistent requires 
      some restraint. There is a function called Object.freeze that changes an object so that writing to its properties is ignored.
`);

let object = Object.freeze({ value: 5 });
object.value = 10;
console.code(`
    let object = Object.freeze({value: 5});
    object.value = 10;
`);
console.log(`object.value >> ${object.value}`);