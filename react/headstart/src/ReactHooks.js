import React, { useState, useRef, useEffect, useCallback, useReducer, useContext, useMemo, memo } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { AppContext } from './index'

/**
 * 1. usestate is hook which is calls inside function & add some state to it
 * 2. React will preserve this state between re-renders
 * 3. It returns as pair, the current state & fuction that lets you update it. 
 */
const UseStateExample = () => {

	const [email, setEmail] = useState('');
	const [history, setHistory] = useState([]);

	return <div>
		<p className="card-text">
			Enter registered email address to join the meeting.
			</p>
		<div className="form-row">
			<div className="form-group col-md-6">
				<label htmlFor="options" className="sr-only">Options</label>
				<input
					type="text"
					className="form-control"
					id="email"
					placeholder="abc@org.net"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
						setHistory([...history, e.target.value]);
					}} />
			</div>
			<div className="form-group col-md-6">
				<button
					type="button"
					className="btn btn-primary mb-2">
					Add</button>
			</div>
		</div>
		<p className="card-text">{email}</p>
		<hr />
		<ul>
			{
				history.map((x, index) => <div key={index}>{x}</div>)
			}
		</ul>
	</div>;
}

/**
 * 1. useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
 * 2. The returned object will persist for the full lifetime of the component.
 */
const UseRefExample = () => {

	const divRef = useRef(null);

	return <div>
		<p className="card-text"
			ref={divRef}
			onMouseOver={() => { divRef.current.style.color = "blue" }}
			onMouseOut={() => { divRef.current.style.color = "" }}>
			Hower this line, and see the magic (slow clap)
		</p>
	</div>;
}

/**
 * 1. The function passed to useEffect will run after the render is committed to the screen.
 * 2. By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
 * 3. If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second 
 *    argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
 * 	  If you pass an empty array ([]), the props and state as inside the effect will always have their initial values
 */
const UseEffectExample = () => {

	const [wineData, setWineData] = useState([]);

	useEffect(() => {
		console.log("UseEffect called!");
		fetchWineData();
		return () => console.log("Unmounting...");
	}, [setWineData]); //// The effect "depends on" if setWineData has been called

	async function fetchWineData() {
		const res = await fetch("http://www.mocky.io/v2/5d2d91572e00005e00c57e83");
		const jsonData = await res.json();
		setWineData([...wineData, ...jsonData]);
	}

	return <div>
		<button className="btn btn-info" onClick={() => { fetchWineData() }}>Trigger Effect</button>
		<hr />
		<ul className="list">
			{
				wineData.map((wine, index) => <li key={index}>{wine.wine_full} ({wine.country})</li>)
			}
		</ul>
	</div>
}

/**
 * 1. Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. 
 *    The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
 * 2. When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a rerender with the latest context value passed 
 * 	  to that MyContext provider.
 */
const UseContextExample = () => {

	const Context = useContext(AppContext);

	return <div>
		{Context.searchToken}!!
	</div>;
}

const Actions = {
	INCREAMENT: 'increament',
	DECREAMENT: 'decreament'
}

const reducer = (state, action) => {
	switch (action.type) {
		case Actions.INCREAMENT:
			return { count: state.count + 1 };
		case Actions.DECREAMENT:
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
};

/**
 * 1. useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. 
 * 2. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
 * 3. React guarantees that dispatch function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.
 */
const UseReducerExample = () => {

	const initialState = { count: 0 }
	const [state, dispatch] = useReducer(reducer, initialState);

	return <>
		Count is <b>{state.count}</b>
		<hr />
		<button className="btn btn-sm btn-success" onClick={() => dispatch({ type: Actions.INCREAMENT })}>+</button>&nbsp;
		<button className="btn btn-sm btn-warning" onClick={() => dispatch({ type: Actions.DECREAMENT })}>-</button>
	</>
}


function CountButton({ onClick, count }) {
	return <button className="btn btn-sm btn-outline-info" onClick={onClick}>Notmal : {count}</button>
}

/**
 * 1. Returns a memoized value.
 * 2. useMemo will only recompute the memoized value when one of the dependencies has changed.
 * 3. This optimization helps to avoid expensive calculations on every render.
 */
function UseMemoExample() {

	const [count1, setCount1] = React.useState(10)
	const increment1 = () => setCount1(c => c + 1)

	const [count2, setCount2] = React.useState(10)
	const increment2 = () => setCount2(c => c + 1)

	const MemoidButton = useMemo(() => <button className="btn btn-sm btn-outline-info" onClick={increment2}>Using Memo : {count2}</button>, [])

	return <div>
		<CountButton count={count1} onClick={increment1} />&nbsp;
		{MemoidButton}
	</div>
}

/**
 * 1. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. 
 * 2. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary 
 * 	  renders (e.g. shouldComponentUpdate).
 * 3. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
 */
const UseCallbackExample = () => {

	const [counter1, setCounter1] = useState(0);
	const [counter2, setCounter2] = useState(0);

	// const increamentAlpha = () => setCounter1(counter1 + 1);
	// const increamentDelta = () => setCounter2(counter2 + 1);
	const increamentAlpha = useCallback(() => setCounter1(counter1 + 1), [counter1]);
	const increamentDelta = useCallback(() => setCounter2(counter2 + 1), [counter2]);

	return <div>
		<Seat onClick={increamentAlpha} seatNumber={counter1} />&nbsp;
		<Seat onClick={increamentDelta} seatNumber={counter2} />
	</div>
}


const randomNumber = () => Math.floor(Math.random() * 1000);
const randomColour = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

const Seat = memo((props) => {
	return <button
		type="button"
		className="btn btn-outline-secondary"
		onClick={props.onClick}>{props.seatNumber} ({randomNumber()})
	</button>;
})

class HookExamples extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return <div className="card">
			<div className="card-header">
				<ul className="nav nav-pills card-header-pills">
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/usestate`} className="nav-link" activeClassName="active">useState</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/useref`} className="nav-link" activeClassName="active">useRef</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/useeffect`} className="nav-link" activeClassName="active">useEffect</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/usereducer`} className="nav-link" activeClassName="active">useReducer</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/usememo`} className="nav-link" activeClassName="active">useMemo</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/usecallback`} className="nav-link" activeClassName="active">useCallback</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={`${this.props.match.url}/usecontext`} className="nav-link" activeClassName="active">useContext</NavLink>
					</li>
				</ul>
			</div>
			<div className="card-body">
				<Route exact path={`${this.props.match.url}/usestate`} component={UseStateExample} />
				<Route path={`${this.props.match.url}/useref`} component={UseRefExample} />
				<Route path={`${this.props.match.url}/useeffect`} component={UseEffectExample} />
				<Route path={`${this.props.match.url}/usereducer`} component={UseReducerExample} />
				<Route path={`${this.props.match.url}/usememo`} component={UseMemoExample} />
				<Route path={`${this.props.match.url}/usecallback`} component={UseCallbackExample} />
				<Route path={`${this.props.match.url}/usecontext`} component={UseContextExample} />
			</div>
		</div>;
	};
}

export default HookExamples;