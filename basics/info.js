const console = require('./utils');

console.h1('JavaScript Info');

console.h2('ECMAScript');
console.comment(`
   - ECMAScript (European Computer Manufacturer's Association) is based on several originating technologies, the most well-known being JavaScript (Netscape) and JScript (Microsoft). 
   - The language was invented by Brendan Eich at Netscape and first appeared in that company's Navigator 2.0 browser. 
   - It has appeared in all subsequent browsers from Netscape and in all browsers from Microsoft starting with Internet Explorer 3.0.
   - ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment.
   - Before ES2015, ECMAScript specifications were commonly called by their edition. So ES5 is the official name for the ECMAScript specification update published in 2009.
   - The sixth version of ECMA Script6 is known as ES6 (it is also called as ECMA Script 2015)   
    - https://www.freecodecamp.org/news/es5-to-esnext-heres-every-feature-added-to-javascript-since-2015-d0c255e13c6e/
    - https://www.ecma-international.org/ecma-262/#sec-intro
   - ES13 (ECMAScript 2022)
    - https://www.inkoop.io/blog/new-javascript-features-for-ecmascript-2022/
    - https://262.ecma-international.org/13.0/
  `);

console.h2('Modules');
console.comment(`
    - The phrase “big ball of mud” is often used for large, structureless programs. Everything sticks together, and when you try to pick out a piece, 
      the whole thing comes apart, and your hands get dirty
    - In JavaScript the term module generally refers to code which exists in a single file. 
    - An NgModule is a  different concept, it combines code from different files together into one package.
    - Modules are an attempt to avoid these problems. A module is a piece of program that specifies which other pieces it relies on and which 
      functionality it provides for other modules to use (its interface).
    - The relations between modules are called dependencies. When a module needs a piece from another module, it is said to depend on that module.
    - The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. Node.js uses it and is the system used by most packages 
      on NPM. The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency, it makes sure 
      the module is loaded and returns its interface.
`);

console.h2('ECMAScript modules');
console.comment(`
    - CommonJS modules work quite well and, in combination with NPM, have allowed the JavaScript community to start sharing code on a large scale.
      But they remain a bit of a duct-tape hack. The notation is slightly awkward— the things you add to exports are not available in the local scope, 
      for example. And because require is a normal function call taking any kind of argument, not just a string literal, it can be hard to determine the 
      dependencies of a module without running its code.
    - This is why the JavaScript standard from 2015 introduces its own, different module system. It is usually called ES modules, where ES stands for
      ECMAScript.
       > The main concepts of dependencies and interfaces remain the same, but the details differ.
       > For one thing, the notation is now integrated into the language. Instead of calling a function to access a dependency, you use a
         special import keyword.

         import ordinal from "ordinal";
         export function formatDate(date, format) { /* ... */ }

       > When you import from another module, you import the binding, not the value, which means an exporting module may change the value of the binding 
         at any time, and the modules that import it will see its new value.
       > When there is a binding named default, it is treated as the module’s main exported value.

         export default ["Winter", "Spring", "Summer", "Autumn"];
`);

console.h2('Babel');
console.comment(`
    - Babel is a transpiler. It rewrites modern JavaScript code into the previous standard.

      Actually, there are two parts in Babel:    
        > First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. 
          And then the code is delivered to the website for users. Modern project build system like webpack or brunch provide means to run transpiler 
          automatically on every code change, so that doesn’t involve any time loss from our side.
        > Second, the polyfill. The transpiler rewrites the code, so syntax features are covered. But for new functions we need to write a special 
          script that implements them. JavaScript is a highly dynamic language, scripts may not just add new functions, but also modify built-in ones, 
          so that they behave according to the modern standard.
        > There’s a term “polyfill” for scripts that “fill in” the gap and add missing implementations.
        > Two interesting polyfills are:    
            babel polyfill that supports a lot, but is big.
            polyfill.io service that allows to load/construct polyfills on-demand, depending on the features we need.
            So, we need to setup the transpiler and add the polyfill for old engines to support modern features.
`);

console.h2('Garbage collection');
console.comment(`
    - Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions…
      All that takes memory.
    - The main concept of memory management in JavaScript is reachability.
    - Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.
    - There’s a background process in the JavaScript engine that is called garbage collector. It monitors all objects and removes 
      those that have become unreachable.
    - The basic garbage collection algorithm is called “mark-and-sweep”.
      > The following “garbage collection” steps are regularly performed:    
      > The garbage collector takes roots and “marks” (remembers) them.
      > Then it visits and “marks” all references from them.
      > Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
      > And so on until there are unvisited references (reachable from the roots).
      > All objects except marked ones are removed.
    - JavaScript engines apply many optimizations to make it run faster and not affect the execution.
      Some of the optimizations:    
       > Generational collection – objects are split into two sets: “new ones” and “old ones”. Many objects appear, do their job and die fast, 
         they can be cleaned up aggressively. Those that survive for long enough, become “old” and are examined less often.
       > Incremental collection – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time 
         and introduce visible delays in the execution. So the engine tries to split the garbage collection into pieces. Then the pieces are 
         executed one by one, separately. That requires some extra bookkeeping between them to track changes, but we have many tiny delays 
         instead of a big one.
       > Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
`);