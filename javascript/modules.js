const console = require('./utils');

console.h1('Modules');
console.comment(`
    - The phrase “big ball of mud” is often used for large, structureless programs. Everything sticks together, and when you try to pick out a piece, 
      the whole thing comes apart, and your hands get dirty
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