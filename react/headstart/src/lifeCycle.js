import React from 'react';

class LifeCycle extends React.Component {
	buttons = [10, 20, 30];
	messageQueue = [];
	/**
	 * The constructor for a React component is called before it is mounted.
	 * You should call super(props) before any other statement.
	 * Should not call setState()
	 * Avoid copying props into state
	 */
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		}
		this.increamentCounter = this.increamentCounter.bind(this);
		this.logMessage(`constructor | State : ${JSON.stringify(this.state)}`);
	}

	/**
	 * Invoked immediately after a component is mounted (inserted into the tree)
	 * This method is a good place to set up any subscriptions.
	 * You may call setState() immediately, It will trigger an extra rendering, but it will happen before the browser updates the screen
	 */
	componentDidMount() {
		this.logMessage(`componentDidMount | State : ${JSON.stringify(this.state)}`);
		/**
		 * Calling forceUpdate() will cause render() to be called on the component, skipping shouldComponentUpdate(). 
		 * This will trigger the normal lifecycle methods for child components, including the shouldComponentUpdate() method of each child. 
		 * React will still only update the DOM if the markup changes.
		 */
		//this.forceUpdate();
	}

	/**
	 * Invoked right before calling the render method, both on the initial mount and on subsequent updates. 
	 * It should return an object to update the state, or null to update nothing.
	 * This method doesn’t have access to the component instance
	 * Note that this method is fired on every render, regardless of the cause
	 */
	static getDerivedStateFromProps(props, state) {
		console.log(`getDerivedStateFromProps | props: ${props.greeting} & State : ${JSON.stringify(state)}`);
		return state;
	}

	/**
	 * Invoked before rendering when new props or state are being received. Defaults to true. 
	 * This method is not called for the initial render or when forceUpdate() is used.
	 * This method only exists as a performance optimization
	 */
	shouldComponentUpdate(nextProps, nextState) {
		var shouldUpdate = this.state.counter !== nextState.counter || this.props.greeting !== nextProps.greeting;
		this.logMessage(`shouldComponentUpdate (${shouldUpdate ? 'Yes' : 'No'}) |  nextProps : ${nextProps.greeting} & nextState : ${JSON.stringify(nextState)}`);
		return shouldUpdate;
	}

	/**
	 * Invoked right before the most recently rendered output is committed to e.g. the DOM.
	 * It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed
	 * A snapshot value (or null) should be returned.
	 */
	getSnapshotBeforeUpdate(prevProps, prevState) {
		this.logMessage(`getSnapshotBeforeUpdate |  prevProps : ${prevProps.greeting} & prevState : ${JSON.stringify(prevState)}`);
		return prevState;
	}

	/**
	 * Invoked immediately after updating occurs, This method is not called for the initial render.
	 * Use this as an opportunity to operate on the DOM when the component has been updated. 
	 * This is also a good place to do network requests as long as you compare the current props to previous props.
	 * You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition
	 */
	componentDidUpdate(prevProps, prevState, snapShot) {
		this.logMessage(`componentDidUpdate | prevProps : ${prevProps.greeting} & prevState : ${JSON.stringify(prevState)} & snapShot : ${snapShot.counter}`);
	}

	/**
	 * Invoked immediately before a component is unmounted and destroyed. 
	 * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created
	 */
	componentWillUnmount() {
		this.logMessage(`componentWillUnmount | State : ${JSON.stringify(this.state)}`);
	}

	/**
	 * This lifecycle is invoked after an error has been thrown by a descendant component. 
	 * It receives the error that was thrown as a parameter and should return a value to update state.
	 * It is called during the “render” phase, so side-effects are not permitted. For those use cases, use componentDidCatch() instead.
	 */
	static getDerivedStateFromError(error) {
		console.log(`getDerivedStateFromError | Error : ${error}`);
		return { hasError: true };
	}

	/**
	 * This lifecycle is invoked after an error has been thrown by a descendant component.
	 * I is called during the “commit” phase, so side-effects are permitted. It should be used for things like logging errors
	 */
	componentDidCatch(error, info) {
		this.logMessage(`componentDidCatch | ${this.state.counter} => ${error} `);
	}

	increamentCounter(event) {
		event.preventDefault();
		this.logMessage(`State Updated to ${+event.target.value}`);
		this.setState({
			counter: +event.target.value
		});
	}

	logMessage(message) {
		console.log(message);
		this.messageQueue.push(message);
	}

	render() {
		this.logMessage(`render | State: ${JSON.stringify(this.state)} & Props: ${this.props.greeting}`);
		return <div>
			<ul className="list-group">
				{
					this.messageQueue.map((x, index) => <li className="list-group-item" key={index}>{x}</li>)
				}
			</ul>
			<hr />
			Message from Parent : <b>{this.props.greeting}</b>
			<hr />
			<BuggyComponent />
			<hr />
			<div>
				{
					this.buttons.map((x) => <button
						type="button"
						className="btn btn-outline-primary"
						key={x}
						onClick={this.increamentCounter}
						value={x}>{x}
					</button>)
				}
			</div>
		</div>
	}
}

class BuggyComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			hasError: false
		}
		this.throwError = this.throwError.bind(this);
	}

	throwError() {
		this.setState({
			hasError: true
		})
	}

	render() {
		if (this.state.hasError)
			throw `Fucking Error!`;
		else
			return <div><button className="btn btn-outline-danger" onClick={this.throwError}>[ BuggyComponent ]</button></div>
	}
}

class DemoLifeCycle extends React.Component {
	buttons = ["Hey!", "Hello!", "Bye!"];
	constructor() {
		super();
		this.state = {
			greeting: "Hi!"
		}
		this.updateGreeting = this.updateGreeting.bind(this);
	}

	updateGreeting(event) {
		event.preventDefault();
		this.setState({
			greeting: event.target.value
		});
	}

	render() {
		return <div className="card">
			<div className="card-header">
				Component LifeCycle (Check console for more clarification)
			 </div>
			<div className="card-body">
				<LifeCycle greeting={this.state.greeting} />
				<hr />
				{
					this.buttons.map((x, index) => <button type="button" className="btn btn-outline-info" key={index} onClick={this.updateGreeting} value={x}>{x}</button>)
				}
			</div>
		</div>
	}
}

export default DemoLifeCycle;