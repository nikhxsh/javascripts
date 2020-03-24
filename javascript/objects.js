const console = require('./utils');

console.h1('Objects');
console.comment(`
   - As we know from the Data types, there are seven data types in JavaScript. Six of them are called “primitive”, because their 
     values contain only a single thing (be it a string or a number or whatever).
   - In contrast, objects are used to store keyed collections of various data and more complex entities. We can imagine an object as a cabinet
     with signed files. Every piece of data is stored in its file by the key. It’s easy to find a file by its name or add/remove a file.
   - Creating an object often begins with defining and initializing a variable
`);

console.h2('Using object initializers');
let account = {
	number: 'X000009098',
	name: ['Crime', 'Master'],
	age: 39,
	gender: 'Male',
	types: ['Saving', 'Loan'],
	'Account Flag': 'Green',
	getTypes: function () {
		return this.number + ' has ' + this.types[0] + ' & ' + this.types[1] + ' accounts.';
	},
	getDetails: function () {
		return this.number + ' belongs to ' + this.name[0] + ' ' + this.name[1] + ' gogo. He\'s' + this.age + ' old.';
	}
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
    let user = new Object(); //"Object constructor" syntax
    let user = {};  // "object literal" syntax

    let account = {
    	number: 'X000009098',
    	name: ['Crime', 'Master'],
    	age: 39,
    	gender: 'Male',
    	types: ['Saving', 'Loan'],
    	'Account Flag': 'Green',
    	getTypes: function () {
            return this.number + ' has ' + this.types[0] + ' & ' + this.types[1] + ' accounts.';
    	},
    	getDetails: function () {
            return this.number + ' belongs to ' + this.name[0] + ' ' + this.name[1] + ' gogo. He\'s' + this.age + ' old.';
    	}
    };
`);
console.log(`JSON.stringify(account) = ${JSON.stringify(account)}`);
console.log(`account.age = ${account.age}`);
console.log(`account['age'] = ${account['age']}`);
console.log(`account['Account Flag'] = ${account['Account Flag']}`);
console.log(`account.types = ${account.types}`);
console.log(`account.getDetails() >> ${account.getDetails()}`);
Object.assign(account, { amount: 1000 });
console.log(`Object.assign(account, { amount: 1000 }) >> account.amount = ${account.amount}`);

console.comment(`
   - You may have noticed "this" keyword, The this keyword refers to the current object the code is being written inside 
   - So in this case "this" is equivalent to object "account"
`);

console.h2('Object (built-in)');
console.comment(`
   - The "Object" constructor creates an object wrapper for the given value.
      > If the value is null or undefined, it will create and return an empty object.
      > Otherwise, it will return an object of a Type that corresponds to the given value.
      > If the value is an object already, it will return the value.
   - When called in a non-constructor context, Object behaves identically to new Object().
`);

const xaccount = Object.create(account);
console.code(`
    //Object.create(proto, [propertiesObject])
    const xaccount = Object.create(account); //Creates a new object, using an existing object as the prototype of the newly created object
	
    xaccount.number // ${xaccount.number}
    xaccount.name[1] // ${xaccount.name[1]}
`);

console.log(`Object.keys({ a: 1, b: 2, sum: () => a + b }) = ${Object.keys({ a: 1, b: 2, sum: () => a + b })}`);
console.log(`Object.values({ a: 1, b: 2, sum: () => a + b }) = ${Object.values({ a: 1, b: 2, sum: () => a + b })}`, `Display all values`);
console.log(`Object.keys('Okay!') = ${Object.keys('Okay!')}`);
console.log(`Object.values('Okay!') = ${Object.values('Okay!')}`);
console.log(`Object.keys(1000) = ${Object.keys(1000)}`, `Returns [] as 1000 is value`);
console.log(`Object.values(1000) = ${Object.values(1000)}`, `Returns [] as 1000 is value`);

console.h2('Using a constructor function');
console.comment(`
   - Alternatively, you can create an object with these two steps:
     > Define the object type by writing a constructor function.
     > Create an instance of the object with new.
`);

function BankAccount(amount) {
	this.amount = amount;
}

console.code(`
    function BankAccount(amount) {
       this.amount = amount;
    }
    var bankAccount = new BankAccount(2000);
`);

console.comment(`
   - "new" operator create instance of a user defined object type having contructor function. When the code new BankAccount(2000) is executed, 
     the following things happen:
       1. A new object is created, inheriting from BankAccount.prototype.
       2. The constructor function BankAccount is called with the specified arguments, and with this bound to the newly created object.
          new BankAccount is equivalent to new BankAccount(), i.e. if no argument list is specified, BankAccount is called without arguments.
       3. The object (not null, false, 3.1415 or other primitive types) returned by the constructor function becomes the result of the whole 
          new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead.
   ** Function constructor creates functions which execute in the global scope only.
   ** Every JavaScript function is actually a Function object. This can be seen with the code (function(){}).constructor === Function which returns true.
`);

console.h2('Object prototypes');
console.comment(`
   - Prototypes are the mechanism by which JavaScript objects inherit features from one another
   - Objects can have a prototype object, which acts as a template object that it inherits methods and properties from.
   - An object's prototype object may also have a prototype object, which it inherits methods and properties from, and 
     so on. This is often referred to as a prototype chain
   - A link is made between the object instance and its prototype (its __proto__ ([[Prototype]]) property, which is derived from 
     the prototype property on the constructor), and the properties and methods are found by walking up the chain of prototypes
   - The prototype relations of JavaScript objects form a tree-shaped structure, and at the root of this structure sits Object.prototype. 
     It provides a few methods that show up in all objects, such as toString, which converts an object to a string representation.
`);

BankAccount.prototype.toString = function () {
	return BankAccount.name;
};
let bankAccountObj = new BankAccount(2000);

console.code(`
    BankAccount.prototype.toString = function () {
       return BankAccount.name;
    };
    let bankAccountObj = new BankAccount(2000);
`);
console.log(`bankAccountObj.toString() >> ${bankAccountObj.toString()}`, 'bankAccountObj --Inherits from prototype of--> BankAccount --Inherits from--> Object');

console.code(`
   BankAccount.prototype >>   
   {
     toString: ƒ ()
     constructor: ƒ BankAccount(BankAccount),
     __proto__: {
         constructor: ƒ Object(),
         hasOwnProperty: ƒ hasOwnProperty(),
         isPrototypeOf: ƒ isPrototypeOf(),
         propertyIsEnumerable: ƒ propertyIsEnumerable(),
         toLocaleString: ƒ toLocaleString(),
         toString: ƒ toString(),
         valueOf: ƒ valueOf()
     }
   }
`);

console.h2('Inheritance using prototype Chain');
console.comment(`
   - When it comes to inheritance, JavaScript only has one construct: objects. 
   - Each object has a private property which holds a link to another object called its prototype(__proto__). 
   - That prototype object has a prototype of its own, and so on until an object is reached with null 
	 as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.
   - Nearly all objects in JavaScript are instances of Object which sits on the top of a prototype chain.
`);

function SpecialAccount(topup) {
	this.topup = topup;
	BankAccount.call(this, topup);
}

//Assign prototype linkage
SpecialAccount.prototype = Object.create(BankAccount.prototype);
SpecialAccount.prototype.constructor = BankAccount;
SpecialAccount.prototype.display = function () {
	return "SpecialAccount has total Amount ₹" + this.amount;
};
var specialAccountObj = new SpecialAccount(1000);

console.code(`
    function SpecialAccount(topup) {
       this.topup = topup;
       BankAccount.call(this, topup);
    }
    
    //Assign prototype linkage
    SpecialAccount.prototype = Object.create(BankAccount.prototype);
    SpecialAccount.prototype.constructor = BankAccount;
    SpecialAccount.prototype.display = function () {
       return "SpecialAccount has total Amount ₹" + this.amount;
    };
    var specialAccountObj = new SpecialAccount(1000);
`);

console.log(`specialAccountObj.display() >> ${specialAccountObj.display()}`);

console.comment(`
   - Every constructor function has a prototype property whose value is an object containing a constructor 
     property. This constructor property points to the original constructor function.
`);

var testAccountObj = Object.create(bankAccountObj);
console.code(`
    var testAccountObj = Object.create(bankAccountObj);
`);

console.log(`bankAccountObj.constructor >> ${bankAccountObj.constructor.name}`);
console.log(`testAccountObj.constructor >> ${testAccountObj.constructor.name}`, 'both return the BankAccount() constructor, as it contains the original definition of these instances.');

console.h2('Polymorphism');
console.comment(`
   - Polymorphism is the presentation of one interface for multiple data types. 
   - A polymorphic function or data type is more general than a monomorphic one, because it can be used in a wider range of 
	 scenarios. In this sense polymorphism represents the idea of generalization in strictly typed languages.
   - Perhaps in JavaScript, it is a bit more difficult to see the effects of polymorphism because the more classical types of 
	 polymorphism are more evident in static type systems, whereas JavaScript has a dynamic type system
   - So, for instance, there is no method or function overloading or automatic type coercions at compile time in JavaScript. In a dynamic language, 
	 we take most of these things for granted. Neither we need something like parametric polymorphism in JavaScript due to the dynamic nature of the language.
   - JS is not a typed language so it really not meant to use OOP concepts like polymorphism
`);

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