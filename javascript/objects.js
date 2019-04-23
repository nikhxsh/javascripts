const console = require('./utils');

console.h1('Objects');
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
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`, 'You can use Object.create to create an object with a specific prototype');
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";

console.code(`
    let protoRabbit = {
      speak(line){
        console.log(\`The \${this.type} rabbit says '\${line}'\`);
      }
    };

    let killerRabbit = Object.create(protoRabbit);
    killerRabbit.type = "killer";
    killerRabbit.speak("SKREEEE!");
`);
killerRabbit.speak("SKREEEE!");


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
        console.log(`The ${this.type} rabbit says '${line}'`);
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
            console.log(\`The \${this.type} rabbit says '\${line}'\`);
        }
    }
    let obj1 = new Rabbit("killer");
    let obj2 = new Rabbit("black");
`);
obj1.speak('SKREEEE!!');
obj2.speak('HELLO!!');


console.h2('Polymorphism');
let blackRabbit = new Rabbit('Black');
console.code(`
    let blackRabbit = new Rabbit('Black');
    console.log(String(blackRabbit));
`);
console.log(`${String(blackRabbit)}`);
Rabbit.prototype.toString = function () {
    return ` A ${this.type} rabbit`;
};
console.code(`
    Rabbit.prototype.toString = function() {
         return \`A \${this.type} rabbit\`;
    };
    console.log(String(blackRabbit));
`);
console.log(String(blackRabbit));

console.h2('Symbols');
console.comment(`
    - It is possible for multiple interfaces to use the same property name for different things. For example, I could define an interface 
      in which the toString method is supposed to convert the object into a piece of yarn. 
    - It would not be possible for an object to conform to both that interface and the standard use of toString
    - Property names are strings, that wasn’t entirely accurate. They usually are, but they can also be symbols. 
    - Symbols are values created with the Symbol function. Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.
`);
let sym = Symbol("name");
console.code(`
    let sym = Symbol("name");
    console.log(sym == Symbol("name"));
`);
console.log(sym == Symbol("name"));
Rabbit.prototype[sym] = 55;
console.code(`
    Rabbit.prototype[sym] = 55;
    console.log(blackRabbit[sym]);
`);
console.log(blackRabbit[sym]);
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

console.h2('Iterator');
console.comment(`
    - The object given to a for/of loop is expected to be iterable. This means it has a method named with the Symbol.iterator symbol
    - When called, that method should return an object that provides a second interface, iterator. This is the actual thing that iterates. 
      It has a next method that returns the next result.
`);
let okIterator = "OKAY"[Symbol.iterator]();
console.code(`
    let okIterator = "OK"[Symbol.iterator]();
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
    console.log(`${x}: ${value}`);
}

shelf.set(1, 'The Alchemist');
console.code(`
    shelf.set(1, 'The Alchemist');
    console.log('shelf.get(1)');
`);
console.log(shelf.get(1));

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

    set (loc, value) {
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
    console.log('musicShelf.get(1)');
`);
console.log(musicShelf.get(1));

console.log(`musicShelf instanceof(Shelf) >> ${musicShelf instanceof(Shelf)}`,'The instanceof operator');

console.h2('Persistent data');
console.comment(`
    - Data structures that don’t change are called immutable or persistent. They behave a lot like strings and numbers in 
      that they are who they are and stay that way, rather than containing different things at different times.
    - In JavaScript, just about everything can be changed, so working with values that are supposed to be persistent requires 
      some restraint. There is a function called Object.freeze that changes an object so that writing to its properties is ignored.
`);

let object = Object.freeze({value: 5});
object.value = 10;
console.code(`
    let object = Object.freeze({value: 5});
    object.value = 10;
    console.log(object.value);
`);
console.log(object.value);