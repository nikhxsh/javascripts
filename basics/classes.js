const console = require('./utils');

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
let killerRabit = new Rabbit("killer");
let blackRabit = new Rabbit("black");

console.code(`
    class Rabbit {
        constructor(type) {
            this.type = type;
        }
        speak(line) {
            return \`The \${this.type} rabbit says '\${line}'\`;
        }
    }
    let killerRabit = new Rabbit("killer");
    let blackRabit = new Rabbit("black");
`);
console.log(`killerRabit.speak('SKREEEE!!'); >> ${killerRabit.speak('SKREEEE!!')}`);
console.log(`blackRabit.speak('HELLO!!'); >> ${blackRabit.speak('HELLO!!')}`);

console.h2('Inheritance');
class ChildRabbit extends Rabbit {
	constructor(type) {
		super(type)
	}
	speak(line) {
		return `The ${this.type} rabbit says '${line}'`;
	}
	set name(value) {
		this.name = value;
	}
	get name() {
		return this.name;
	}
}

let childRabbit = new ChildRabbit("Child");
console.code(`
    class ChildRabbit extends Rabbit {
        constructor(type) {
          super(type)
        }
        speak(line) {
          return \`The \${this.type} rabbit says '\${this.line}'\`;
    	}
    }
    let childRabbit = new ChildRabbit("Child");
`);
console.log(`blackRabit.speak('HELLO!!'); >> ${blackRabit.speak('HELLO!!')}`);
console.log(`childRabbit.speak('LOL!'); >> ${childRabbit.speak('LOL!')} `);

console.h2('Polymorphism');
let blackRabbit = new Rabbit('Black');
console.code(`
    let blackRabbit = new Rabbit('Black');
`);
console.log(`String(blackRabbit); >> ${String(blackRabbit)} `);
console.log(`blackRabbit.toString(); >> ${blackRabbit.toString()} `);

Rabbit.prototype.toString = function () {
	return ` A ${this.type} rabbit`;
};
console.code(`
    Rabbit.prototype.toString = function () {
	  return \`A \${this.type} rabbit\`;
    };
`);
console.log(`String(blackRabbit); >> ${String(blackRabbit)}`);
console.log(`blackRabbit.toString(); >> ${blackRabbit.toString()}`);

console.h2('Static');
console.comment(`
  - The static keyword defines a static method for a class. Static methods aren't called on instances of the class. 
  - Instead, they're called on the class itself. These are often utility functions, such as functions to create or clone objects
`);
class ClassWithStaticMethod {
	static staticMethod() {
		return 'static method has been called.';
	}
}
console.code(`
    class ClassWithStaticMethod {
       static staticMethod() {
          return 'static method has been called.';
       }
    }
`);
console.log(`ClassWithStaticMethod.staticMethod(); >> ${ClassWithStaticMethod.staticMethod()}`);
