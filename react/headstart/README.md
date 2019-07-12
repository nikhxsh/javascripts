## Setting up development enviroment

* `npm install -g create-react-app` 

* `create-react-app headstart`

* `npm start`
    Starts the development server.

* `npm run build`
    Bundles the app into static files for production.

* `npm test`
    Starts the test runner.

* `npm run eject`
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

[More Info about React](https://reactjs.org/tutorial/tutorial.html)

## Why React?

* It is javascript library (not framework) to build user interfaces.	
	* Framework
		* Limited flexibility: To things a certain way and hard to deviate.	
		* Large & full of feature: So hard to customize & use the whole thing

* React is declarative means we will tell react what to build and it will take care how to do it.

* The Virtual Browser (vs DOM API) and just javascript

* React native to build mobile apps & battle tested by Facebook

* More details (https://jscomplete.com/learn/why-react)

## Basic Concepts
 
* Component
	- Like functions
	- Inputs: Props (Immutable) + State (Mutable) => Model
	- Use as `<Component />`
	- Model + Component => DOM (Virtual)
	- Function/Class Component
```javascirpt
	//Input => Props & State
	
	//Function component
	const Card = (props) => {
		return (
			<domElementOrComponent .../>
		)
	}	

	//Class Component
	class Card extends React.Component {
		render() {
			return (<domElementOrComponent .../>)
		}
	}

	//Output => DOM	
```
 	
* Reactive updates
	- Takes updates from browser
	- DOM Events => Sends back to State and trigger another render cycle
	- Generate HTML using Javascript
	- No Html Templates!!
	- Tree reconcilation (Use virtual DOM - Only required element re-render not entire DOM node )

* JSX
	* It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.
	* After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.
	* This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:
```javascript
function display(value) {
  if (value) {
    return <h1>Hello, {formatName(value)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
	* JSX prevents Injections attacks. By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application.

## The component life cycle

* Mouting : These method called when a component instance is created and inserted into DOM
	
	* `constructor`		
		- Basically used to intialise state using this.state, bind event handler methods to an instace & use props by calling super(props). Otherwise not required.
		- It is called before component is mounted
		```javascript
		constructor(props) {
		super(props);
		// Don't call this.setState() here!
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);
		}
		```

	* `static getDerivedStateFromProps(props, state)`
		- getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. 
		- It should return an object to update the state, or null to update nothing.
		- This method exists for rare use cases where the state depends on changes in props over time. 
		- For example, it might be handy for implementing a <Transition> component that compares its previous and next children to decide which of them to animate in and out.
	
	* `render()`
		- When called it exmines `this.props` & `this.state` and return React element and respective rendered data
		- It should not modify component state

	* `componentDidMount()`
		- Invoked after component is mounted (i.e. inserted into DOM tree)
		- This is ideal place to set up any subscription
		- You can setState() which will trigger an extra rendering, but it will happen before browser updates screen. But user wont able to see changed state.

* Updating: An update due to change in props or state which will trigger re-rendering

	* `shouldComponentUpdate(nextProps, nextState)`
		- This method only exists as a performance optimization. Do not rely on it to “prevent” a rendering, as this can lead to bugs
		- If you are confident you want to write it by hand, you may compare this.props with nextProps and this.state with nextState and return false to tell React the update can be skipped. Note that returning false does not prevent child components from re-rendering when their state changes.

	* `getSnapshotBeforeUpdate(prevProps, prevState)`
		- getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. 
		- It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. 
		- Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().
		- A snapshot value (or null) should be returned.

	* `componentDidUpdate(prevProps, prevState, snapshot)`
		- Invoked fater updating occurs, this method not called for initial rendering.
		- It ideal place to operated on DOM when component has been update.

* Unmounting: Called when component is being removed from DOM

	* `componentDidCatch(error, info)`
		- Invoked after an error has been thrown by descendent component.
		- Called during the commit phase

	* `componentWillUnmount`
		- componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. 
		- Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().