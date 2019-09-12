const console = require('./utils');

console.h1('Objects');
console.comment(`
    - As we know from the Data types, there are seven data types in JavaScript. Six of them are called “primitive”, because their 
      values contain only a single thing (be it a string or a number or whatever).
    - In contrast, objects are used to store keyed collections of various data and more complex entities. We can imagine an object as a cabinet 
      with signed files. Every piece of data is stored in its file by the key. It’s easy to find a file by its name or add/remove a file.
`);
console.code(`
    let user = new Object(); // "object constructor" syntax
    let user = {};  // "object literal" syntax
`);
let descriptions = {
    work: 'Went to work',
    'touched tree': 'Touched a tree',
    events: ['work', 'sleep', 'pizza', 'running'],
    statement: `I love fucking with people's mind! lol!`
};

let listall = function listAllProperties(o) {
    var objectToInspect;
    var result = [];
    for (objectToInspect = o; objectToInspect !== null;
        objectToInspect = Object.getPrototypeOf(objectToInspect)) {
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );
    }
    return result;
}

console.code(`
    let descriptions = {
        work: 'Went to work',
        'touched tree': 'Touched a tree',
        events: ['work', 'sleep', 'pizza', 'running'],
        statement: \`I love fucking with people's mind! lol!\`
    }
`);
console.log(`JSON.stringify(descriptions) = ${JSON.stringify(descriptions)}`);
console.log(`descriptions.work = ${descriptions.work}`);
console.log(`descriptions['work'] = ${descriptions['work']}`);
console.log(`descriptions['touched tree'] = ${descriptions['touched tree']}`);
console.log(`descriptions.events = ${descriptions.events}`);
Object.assign(descriptions, { Gym: true });
console.log(`Object.assign(descriptions, { Gym : true}) Then descriptions.Gym = ${descriptions.Gym}`);
console.log(`Object.keys(descriptions) = ${Object.keys(descriptions)}`);
console.log(`Object.values(descriptions) = ${Object.values(descriptions)}`);
console.log(`listall(descriptions) = ${listall(descriptions)}`, `This can be useful to reveal "hidden" properties`);
console.log(`Object.keys('Okay!') = ${Object.keys('Okay!')}`);
console.log(`Object.values('Okay!') = ${Object.values('Okay!')}`);
console.log(`Object.keys(1000) = ${Object.keys(1000)}`, `Prints nothing`);
console.log(`Object.values(1000) = ${Object.values(1000)}`);

console.h2('Prototypes');
console.comment(`
    - In addition to their set of properties, most objects also have a prototype.A prototype is another object that is used as a fallback source of 
      properties. When an object gets a request for a property that it does not have, its prototype will be searched for the property, then the prototype’s 
      prototype, and so on.
    - The prototype relations of JavaScript objects form a tree-shaped structure, and at the root of this structure sits Object.prototype. 
      It provides a few methods that show up in all objects, such as toString, which converts an object to a string representation.
    - Many objects don’t directly have Object.prototype as their prototype but instead have another object that provides a different set of default 
      properties. Functions derive from Function.prototype, and arrays derive from Array.prototype.
`);
console.log(`Object.getPrototypeOf({}) == Object.prototype > ${Object.getPrototypeOf({}) == Object.prototype}`);
console.log(`Object.getPrototypeOf(Math.max) == Function.prototype > ${Object.getPrototypeOf(Math.max) == Function.prototype}`);
console.log(`Object.getPrototypeOf([1,2]) == Array.prototype > ${Object.getPrototypeOf([1, 2]) == Array.prototype}`);

let protoRabbit = {
    age: undefined,
    speak(line) {
        return `The ${this.type} rabbit says '${line}'`;
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";

console.code(`
    let protoRabbit = {
        age: undefined,
        speak(line) {
            return \`The \${this.type} rabbit says '\${line}'\`;
        }
    };
    let killerRabbit = Object.create(protoRabbit);
`);
console.log(`killerRabbit.speak("SKREEEE!"); >> ${killerRabbit.speak("SKREEEE!")}`);

console.comment(`
    - __proto__ is a historical getter/setter for [[Prototype]]
    - It exists for historical reasons, in modern language it is replaced with functions Object.getPrototypeOf/Object.setPrototypeOf 
      that also get/set the prototype. 
`);
protoRabbit.__proto__ = {
    fly: true
};
console.code(`
    protoRabbit.__proto__ = {
        fly : true
    };
`);
console.log(`killerRabbit.fly >> ${killerRabbit.fly}`);

console.h2('Classes');
console.comment(`
    - So JavaScript classes are constructor functions with a prototype property. That is how they work, 
      and until 2015, that was how you had to write them. These days, we have a less awkward notation.
`);

class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        return `The ${this.type} rabbit says '${line}'`;
    }
}
let obj1 = new Rabbit("killer");
let obj2 = new Rabbit("black");

console.code(`
    class Rabbit {
        constructor(type) {
            this.type = type;
        }
        speak(line) {
            return \`The \${this.type} rabbit says '\${line}'\`;
        }
    }
    let obj1 = new Rabbit("killer");
    let obj2 = new Rabbit("black");
`);
console.log(`obj1.speak('SKREEEE!!'); >> ${obj1.speak('SKREEEE!!')}`);
console.log(`obj2.speak('HELLO!!'); >> ${obj2.speak('HELLO!!')}`);


console.h2('Polymorphism');
let blackRabbit = new Rabbit('Black');
console.code(`
    let blackRabbit = new Rabbit('Black');    
`);
console.log(`String(blackRabbit); >> ${String(blackRabbit)}`);
console.log(`blackRabbit.toString(); >> ${blackRabbit.toString()}`);

Rabbit.prototype.toString = function () {
    return ` A ${this.type} rabbit`;
};
console.code(`
    Rabbit.prototype.toString = function() {
         return \`A \${this.type} rabbit\`;
    };
`);
console.log(`String(blackRabbit); >> ${String(blackRabbit)}`);
console.log(`blackRabbit.toString(); >> ${blackRabbit.toString()}`);

console.h2('Symbols');
console.comment(`
    - By specification, object property keys may be either of string type, or of symbol type. 
      Not numbers, not booleans, only strings or symbols, these two types.
    - “Symbol” value represents a unique identifier.
    - Symbols are values created with the Symbol function. Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.
`);
let id1 = Symbol("id");
let id2 = Symbol("id");
console.code(`
    let id1 = Symbol("id");
    let id2 = Symbol("id");
`);
console.log(`id1 == id2 >> ${id1 == id2}`);
console.log(`id1.toString() >> ${id1.toString()}`);

console.comment(`
    - Symbols allow us to create “hidden” properties of an object, that no other part of code can occasionally access or overwrite.
`);
let user = {
    name: "John",
    age: 30
};
let id = Symbol("id");
user[id] = "Secret";
console.code(`
    let user = {
        name: "John",
        age: 30
    };
    let id = Symbol("id");
    user[id] = "Secret";
`);
console.log(`user[id] >> ${user[id]}`);

console.comment(`
    - Now note that if we used a string "id" instead of a symbol for the same purpose, then there would be a conflict
`);
user[id] = "Secret 123";
console.code(`
    user[id] = "Secret 123";
`);
console.log(`user[id] >> ${user[id]}`, 'overwritten! it did not mean to harm the colleague, but did it!');

console.comment(`
    - If we want to use a symbol in an object literal, we need square brackets
`);
console.code(`
    let user = {
        name: "John",
        age: 30,
        [test]: 123 // not just "test: 123"
    };
`);

console.comment(`
    - Symbolic properties do not participate in for..in loop
    - In contrast, Object.assign copies both string and symbol properties
`);
console.code(`
    for (let key in user) console.log(key);
`);
for (let key in user) console.log(">> " + key);

console.comment(`
    - If different parts of our application want to access symbol "id" meaning exactly the same property
    - To achieve that, there exists a global symbol registry. We can create symbols in it and access them later, 
      and it guarantees that repeated accesses by the same name return exactly the same symbol.
    - Symbol.for call checks the global registry, and if there’s a symbol described as key, then returns it, otherwise creates 
      a new symbol Symbol(key) and stores it in the registry by the given key.
    -  Symbol.keyFor(sym) returns a name by a global symbol.
    - Well know system symbols:
        Symbol.hasInstance
        Symbol.isConcatSpreadable
        Symbol.iterator
        Symbol.toPrimitive
        …and so on.
`);
console.code(`
    let id = Symbol.for("id"); // if the symbol did not exist, it is created

    let idAgain = Symbol.for("id");

    id === idAgain >> true
    Symbol.keyFor(idAgain) >> id
`);

console.comment(`
    - Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, 
      no matter what their names are.
`);
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
    return `${this.length} cm of blue yarn`;
};
console.code(`
    const toStringSymbol = Symbol("toString");
    Array.prototype[toStringSymbol] = function () {
        return \`\${this.length} cm of blue yarn\`;
    };
`);
console.log(`[1, 2].toString() >> ${[1, 2].toString()}`);
console.log(`[1, 2][toStringSymbol]() >> ${[1, 2][toStringSymbol]()}`);

user[Symbol.toPrimitive] = function (hint) {
    return hint == 'string' ? `Hint: ${this.name}` : this.age;
}
console.code(`
    user[Symbol.toPrimitive] = function(hint){
        return hint == 'string' ? \`Hint: \${this.name}\` : this.age; 
    }
`);
console.log(`user >> ${user}`);
console.log(`+user >> ${+user}`);
console.log(`user + 15 >> ${user + 15}`);

let obj = {
    toString() { // toString handles all conversions in the absence of other methods
        return "2";
    }
};
console.code(`
    let obj = {
        toString() { // toString handles all conversions in the absence of other methods
            return "2";
        }
    };
`);
console.log(`obj * 2 >> ${obj * 2}`);

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