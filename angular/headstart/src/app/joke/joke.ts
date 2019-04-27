/**
 * > decorate a class with extra info using the @syntax
 * > This is a new feature that will probably make it into the ES7 version of JavaScript, it’s not available
 * right now however even in the ES6 version.
 * > However the functionality is available in TypeScript, so we can already make use it.It allows us to decorate 
 * classes and functions, similar to annotations in java and decorators in python.
 * > So for a class it’s going to be the function constructor for that 
 * class, the under-the-hood implementation of a class.
 * > Knowing this we can actually dynamically add a function to our Joke class by using the
 * Object.defineProperty function
 */
function Version(target) {
    Object.defineProperty(target.prototype, 'version', { value: () => "4" });
}
/**
 * > Decorators with arguments
 *   1. We pass a config object to the outer Course function.
 *   2. Then use that config in the returned inner decorator function.
 */
function VersionX(config) {
    return function (target) {
        Object.defineProperty(target.prototype, 'version', { value: () => config.version });
    }
}

/**
 * A class is a blueprint for creating objects with specific functions and properties already attached to it
 */

//@Version
@VersionX({
    version: 1.1
})
class Joke implements IJoke {
    setup: string;
    punchline: string;
    hide: boolean;
    rating: Rating;

    constructor(setup: string, punchline: string) {
        this.setup = setup;
        this.punchline = punchline;
        this.hide = true;
        this.rating = Rating.Good;
    }

    toggle() {
        this.hide = !this.hide;
    }
}

/**
 * > TypeScript has another feature called an interface. An interface can be used in a number of
 * scenarios but by far the most common is when used with classes.
 * > An interface lets you describe the minimum set of public facing properties or methods that a class has.
 */

interface IJoke {
    setup: string,
    punchline: string,
    toggle: Function,
    test?: Function, //optional to implement
    rating: Rating
}

/**
 * An Enum is a datatype consisting of a set of named values. The names are usually identifiers that
 * behave as constants. Enums were introduced in ES6.
 */
enum Rating {
    Worst = 1,
    Good,
    Nice,
    Best,
    Excellent
}

/**
 * ES6 took the best of the existing module systems and introduced this concept on a language level.
 * Although it’s made it into the ES6 standard it’s up to the javascript engine makers to actually
 * implement it natively and they haven’t… yet.
 * So until that happens we code using the ES6 module syntax in TypeScript. When typescript
 * transpiles the code to ES5 it uses the CommonJS module loading system which we touched on above.
 * > Default exports
 *   export default function square(x) {
 *     return Math.pow(x,2)
 *   }
 *   import square from './utils';
 */
export { Joke, Rating }