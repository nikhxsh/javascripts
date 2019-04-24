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
    - A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is 
      the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result
      available to all of the subscribed code when it’s ready.
    - In the case of asynchronous actions, you could, instead of arranging for a function to be called at some point in the future, 
      return an object that represents this future event.
    - This is what the standard class Promise is for. A promise is an asynchronous action that may complete at some point and produce a value.
    - The easiest way to create a promise is by calling Promise.resolve. This function ensures that the value you give it is wrapped in a promise. 
      If it’s already a promise, it is simply returned—otherwise, you get a new promise that immediately finishes with your value as its result.
`);

let xpromise = new Promise(function (resolve, reject) {
  // executor
  // the function is executed automatically when the promise is constructed
  setTimeout(() => resolve(">> xpromise done!"), 5000);
  setTimeout(() => reject(new Error(">> Whoops! xpromise failed!")), 5000); //ignored
});
console.code(`
    let xpromise = new Promise(function (resolve, reject) {
      // executor
      // the function is executed automatically when the promise is constructed
      setTimeout(() => resolve(">> xpromise done!"), 5000);
      setTimeout(() => reject(new Error(">> Whoops! xpromise failed!")), 5000); //ignored
    });
    xpromise.then(console.log);
`);
xpromise.then(console.log);
let ypromise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error(">> Whoops! ypromise failed!")), 5000);
});
console.code(`
    let ypromise = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error(">> Whoops! ypromise failed!")), 5000);
    });
    ypromise.then(value => value).catch(console.log);
`);
ypromise.then(value => value).catch(console.log);
console.comment(`    
    - The function passed to new Promise is called the executor. When the promise is created, this executor function runs automatically. 
      It contains the producing code, that should eventually produce a result.
    - The resulting promise object has internal properties:
       > state — initially “pending”, then changes to either “fulfilled” or “rejected”,
       > result — an arbitrary value of your choosing, initially undefined.
    - We can see two things by running the code above:
      > The executor is called automatically and immediately (by the new Promise).
      > The executor receives two arguments: resolve and reject — these functions are pre-defined by the JavaScript engine. 
      > So we don’t need to create them. Instead, we should write the executor to call them when ready.
      > After one second of “processing” the executor calls resolve("done") to produce the result
`);

let multiPromise = new Promise(function (resolve, reject) {
  resolve('>> Resolve 1');
  resolve('>> Resolve 2'); //Ignored
  resolve('>> Resolve 3'); //Ignored
});
console.code(`
    let multiPromise = new Promise(function(resolve,reject){
      resolve('>> Resolve 1');    
      resolve('>> Resolve 2'); //Ignored
      resolve('>> Resolve 3'); //Ignored
    });
    multiPromise.then(console.log);
`);
multiPromise.then(console.log);

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

console.h1('Promisification');
console.comment(`    
    - When working with collections of promises running at the same time, the Promise.all function can be useful. It returns a promise that waits for 
      all of the promises in the array to resolve and then resolves to an array of the values that these promises produced 
      (in the same order as the original array). If any promise is rejected, the result of Promise.all is itself rejected.
`);
console.code(`
    function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => callback(null, script);
      script.onerror = () => callback(new Error(\`Script load error for \${src}\`));

      document.head.append(script);
    } 

    function promisify(f) {
      return function (...args) { // return a wrapper-function
        return new Promise((resolve, reject) => {
          function callback(err, result) { // our custom callback for f
            if (err) {
              return reject(err);
            } else {
              resolve(manyArgs ? results : results[0]);
            }
          }

          args.push(callback); // append our custom callback to the end of arguments

          f.call(this, ...args); // call the original function
        });
      };
    };

    let loadScriptPromise = promisify(loadScript);
    loadScriptPromise(...).then(...);
`);

console.h2('Promise Chaining and error handling');
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
  .then(value => console.log(">> Handler 1"))
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

console.h2('Delay with a promise');
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
console.code(` 
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    delay(7000).then(() => console.log('runs after 7 seconds'));
`);
delay(7000).then(() => console.log('>> runs after 7 seconds'));

console.h2('Callbacks Vs Promise');
console.comment(`
    - Callbacks
      > We must have a callback function at our disposal when calling loadScript(script, callback). In other words, we must know what to do 
        with the result before loadScript is called.
      > There can be only one callback.
      
    - Promises
      > Promises allow us to do things in the natural order. First, we run loadScript(script), and .then we write what to do with the result.
      > We can call .then on a Promise as many times as we want. Each time, we’re adding a new “fan”, a new subscribing function, to the 
        “subscription list” (Promises chaining).
`);

console.h2('Async');
async function AsyncFunc() {
  return Promise.resolve('>> Async');
}
AsyncFunc().then(console.log);
console.code(` 
    async function AsyncFunc() {
      return Promise.resolve('>> Async');
    }

    AsyncFunc().then(console.log);
`);
console.comment(`
    - The keyword await makes JavaScript wait until that promise settles and returns its result.
`);
async function AsyncAwaitFunc() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(">> AsyncAwaitFunc done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  console.log(result); // "done!"
}
AsyncAwaitFunc();
console.code(` 
    async function AsyncAwaitFunc() {

      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(">> AsyncAwaitFunc done!"), 1000)
      });

      let result = await promise; // wait till the promise resolves (*)

      console.log(result); // "done!"
    }

    AsyncAwaitFunc();
`);
console.comment(`
    - If a promise resolves normally, then await promise returns the result. But in case of a rejection, 
      it throws the error, just as if there were a throw statement at that line.
`);
console.code(` 
    async function f() {

      try {
        let response = await fetch('http://no-such-url');
      } catch(err) {
        alert(err); // TypeError: failed to fetch
      }
    }

    f();
`);