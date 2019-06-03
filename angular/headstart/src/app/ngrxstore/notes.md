## Redux

* Redux is the predictable state container for JavaScript applications. Redux following the Unidirectional flow. Redux has a Single Store. 
* Redux cannot have multiple stores. A  Store is divided into various state objects. So all we need is to maintain the single store, or we can say 
  the only source of truth.
* Three main Principles Of Redux
     1. Single source of truth (means that the state of your whole application is stored in an object tree within a single store)
     2. The state is read-only (State in a redux app is immutable. So when a reducer changes something in the state, it returns a new state object)
     3. Changes are made with pure functions (The operation triggered by dispatching an action is going to be a pure function called, within the redux
		architecture, reducers)

## Flux 

* Flux is the application architecture that Facebook uses for building client-side web applications. It complements React is composable 
  view components by utilizing a unidirectional data flow.
* It is more of a pattern rather than a formal framework, and you can start using Flux immediately without a lot of new code. It has:
	1. **Actions**: simple objects with a type property and some data
	2. **Stores**: contain the application is state and logic. The best abstraction is to think of stores as managing a particular domain 
		of the application
	3. **The Dispatcher**: acts as a central hub. The dispatcher processes actions (for example, user interactions) and invokes callbacks 
		that the stores have registered with it.
	4. **Views**: are controller-views, also very common in most GUI MVC patterns. They listen for changes from the stores and re-render 
		themselves appropriately  
     
## NGRX

* NGRX is a group of libraries “inspired” by the Redux pattern which in turn is “inspired” by the Flux pattern. Being a little more 
  concise, this means that redux pattern is a simplified version of the Flux pattern and NGRX is an angular/rxjs version of the redux
  pattern.
* The main purpose of this pattern is to provide a predictable state container, based on three main principles of redux.
  When you are building an angular app usually you have the state split and handle in multiple services. As your app growth keeping 
  track of your state changes starts to get messy and hard to debug and maintain. Having a single source of truth resolves this problem 
  since the state is handled only in one object and in one place, so debugging or adding changes becomes way easier.
  
## Benefits of using NGRX

* We have already mentioned most of them out while talking about the redux pattern principles. But let is point out the most important benefits of 
  using the redux pattern in an application (in my opinion):
	1. Since we have a single source of truth and you can’t directly change the state, applications are going to behave more consistently.
	2. Using the redux pattern gives us a lot of cool features to make debugging easier.
	3. Applications become easier to test since we are introducing pure functions to handle changes in the state and also because both, ngrx and rxjs, 
	   have a lot is great features for testing.
	4. As soon as you feel comfortable with using ngrx, understanding the flow of data in your applications becomes incredibly easy and predictable.
  
## Cons

1. NGRX has, of course, a learning curve. 
2. So every time you add some property to the state, you need to add the actions, the dispatchers, you may need to update or add the selectors,the 
   effects if any, update the store. And also you start piping (concatenating) rxjs operators and observables all over the place. 
3. NGRX is not part of the angular core libraries and is not supported by Google, at least not directly because there are ngrx contributors that are 
   part of the Angular team. Just something to consider since you are adding a library that is going to be a big dependency for your app.
  
## When to use NGRX.

   So, in a general opinion ngrx should be used in medium/big projects were managing the state starts to become hard to maintain and overwhelming. 
  

## NGRX flow

###### Action

* In the most common scenario, everything starts in the component view. Some interaction made by a user may cause the component to dispatch an action.
* In the store object, you have a function to dispatch (trigger) actions. Actions are classes that implemenets the NGRX Action interface. These Action classes 
  have two properties
	* __Type__: it is a read only string describing what the action stand for. For example: ‘[User] Get User Name’
	* __Payload__: the type of this property depends on what type of data this action needs to send to the reducer. 
	  In the case of the previous example, is going to be a string containing the user name. Not all actions needs a payload.
  
###### Reducer

* If this action doesn't trigger an effect then a **Reducer** is going to analyze the action (usually using a switch statement) and return a new state that is 
  is going to be the result of merging the old state with the value that changed by calling the action.
* **Reducers** are pure functions accepting two arguments, the previous state and an Action. When an Action is dispatched ngrx goes through all the	reducers passing 
  as arguments the previous state and the Action, in the order that the reducers where created, until it finds a case for that action.
  
###### Effect

* If an **effect** gets triggered by dispatching an action is because some side effects are going to happen before calling the reducer. This can probably be something 
  like calling an HTTP service to get data.
	1. **Effects**, on the ngrx libraries ecosystem, allow us to deal with side-effects caused from dispatching an action outside angular components or the ngrx store.
	2. The Effects listen if any action is dispatched, then, similar to what reducers do, it checks if the action is one of the actions type it has a case for.
	3. Then is going to perform a side-effect, usually getting or sending data to an API.
	4. Finally is going to emit another action, usually, an action referring to the result-state of the side effect (success, error, etc), then a reducer is going 
        to enter in the scene as we already mention in the ngrx flow.

###### Selector 

* After the effect is done (side effects are finished) a new “state-result” action gets fired by the effect. Now the Store has a new state. The state can be a 
  big object tree, so ngrx introduces **selectors** to be able to use only the slices of the object that we need in a specific component.
* NGRX store provides us the function “select” to obtain slices of our store. But what if we need to apply some logic to that slice before using the data
  in the components.
* There is where selectors take action. They allow us to decouple any state slice data transformation from the components. The store “select” function accepts 
  an an argument a pure function, this pure function is our selector

###### Store

* A **store** is an object (an instance of the ngrx Store class) that brings the things we mentioned before (Actions, Reducers, Selectors) together. 
  For example, when an action is dispatched (using the store object dispatch function), the store is the one finding and executing the appropriate reducer.
* It is also the one holding the application state.