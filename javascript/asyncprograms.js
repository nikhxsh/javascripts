const console = require('./utils');

console.h1('Asynchronous Programming');
console.comment(`    
    - An asynchronous model allows multiple things to happen at the same time. When you start an action, your program continues to run. 
      When the action finishes, the program is informed and gets access to the result
    - In a synchronous environment, where the request function returns only after it has done its work, the easiest way to perform this task is 
      to make the requests one after the other.
    - One approach to asynchronous programming is to make functions that perform a slow action take an extra argument, a callback function The action 
      is started, and when it finishes, the callback function is called with the result.
    - In a way, asynchronicity is contagious. Any function that calls a function that works asynchronously must itself be asynchronous, 
      using a callback or similar mechanism to deliver its result.
      
        As an example, the setTimeout function, available both in Node.js and in browsers, waits a given number of milliseconds 
        (a second is a thousand milliseconds) and then calls a function.
`);
console.code(`
      setTimeout(() => console.log("Tick"), 500);
`);

console.h2('Promises');
console.comment(`    
    - In the case of asynchronous actions, you could, instead of arranging for a function to be called at some point in the future, 
      return an object that represents this future event.
    - This is what the standard class Promise is for. A promise is an asynchronous action that may complete at some point and produce a value.
    - The easiest way to create a promise is by calling Promise.resolve. This function ensures that the value you give it is wrapped in a promise. 
      If it’s already a promise, it is simply returned—otherwise, you get a new promise that immediately finishes with your value as its result.
`);
let fifteen = Promise.resolve(15);
console.code(`
    let fifteen = Promise.resolve(15);
    fifteen.then(value => console.log(\`>> Got \${value}\`));
`);
fifteen.then(value => console.log(`>> Got ${value}`));
console.comment(`    
    - To get the result of a promise, you can use its then method. This registers a callback function to be called when the promise resolves 
      and produces a value.
    - You can add multiple callbacks to a single promise, and they will be called, even if you add them after the promise has already 
      resolved (finished).
    - 'then' returns another promise, which resolves to the value that the handler function returns or, if that returns a promise, waits for 
      that promise and then resolves to its result.
    - This is the main advantage of promises—they simplify the use of asynchronous functions. Instead of having to pass around callbacks, 
      promise-based functions look similar to regular ones: they take input as arguments and return their output  
`);
console.code(`
    function storage(nest, name) {
      return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
      });
    }

    storage(bigOak, "enemies")
      .then(value => console.log("Got", value));
`);

console.comment(`    
    - One of the most pressing problems with the callback style of asynchronous programming is that it makes it extremely difficult to
      make sure failures are properly reported to the callbacks.
    - Promises make this easier. They can be either resolved (the action finished successfully) or rejected (it failed). Resolve handlers 
      (as registered with then) are called only when the action is successful, and rejections are automatically propagated to the new promise 
      that is returned by then.
    - when a handler returns a promise that is rejected, that rejection flows into the next promise.There’s a Promise.reject function that creates 
      a new, immediately rejected promise.
`);

new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1"))
  .catch(reason => {
    console.log(`>> Caught failure ${reason}`);
    return "nothing";
  })
  .then(value => console.log(`>> Handler 2 ${value}`));

console.code(`
    new Promise((_, reject) => reject(new Error("Fail")))
      .then(value => console.log("Handler 1"))
      .catch(reason => {
        console.log(\`>> Caught failure \${reason}\`);
        return "nothing";
      })
      .then(value => console.log(\` Handler 2 \${value}\`));
`);

function doAsyncTask(flag) {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`>> Async Work Complete for ${flag}`);
      if (!flag) {
        reject('Task Complete!');
      } else {
        resolve('Task Errored!');
      }
    }, 1000);
  });
  return promise;
}

doAsyncTask(true).then(
  (x) => console.log(`>> ${x}`),
  (x) => console.log(`>> ${x}`)
);

doAsyncTask(false).then(
  (x) => console.log(`>> ${x}`),
  (x) => console.log(`>> ${x}`)
);

console.code(` 
    function doAsyncTask(error) {
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("Async Work Complete");
          if (error) {
            reject();
          } else {
            resolve();
          }
        }, 1000);
      });
      return promise;
    }
    
    doAsyncTask(true).then(
      () => console.log("Task Complete!"),
      () => console.log("Task Errored!"),
    );

    doAsyncTask(false).then(
      () => console.log("Task Complete!"),
      () => console.log("Task Errored!"),
    );
`);

console.comment(`    
    - When working with collections of promises running at the same time, the Promise.all function can be useful. It returns a promise that waits for 
      all of the promises in the array to resolve and then resolves to an array of the values that these promises produced 
      (in the same order as the original array). If any promise is rejected, the result of Promise.all is itself rejected.
`);

console.h2('Promise Chaining');
Promise.resolve("done")
  .then(
    (val) => {
      console.log(`>> ${val}`);
      return 'done2';
    },
    (err) => console.log(`>> ${err}`)
  )
  .then(
    (val) => console.log(`>> ${val}`),
    (err) => console.log(`>> ${err}`)
  );
console.code(` 
    Promise.resolve("done")
      .then(
        (val) => {
          console.log(val);
          return 'done2';
        },
        (err) => console.log(\`>> \${err}\`)
      )
      .then(
        (val) => console.log(\`>> \${err}\`),
        (err) => console.log(\`>> \${err}\`)
      );
`);