import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class SelectExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
		this.timeOutId = null;
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.onFocusHandler = this.onFocusHandler.bind(this);
	}

	onClickHandler() {
		this.setState(currentState => ({
			isOpen: !currentState.isOpen
		}))
	}

	onBlurHandler() {
		this.timeOutId = setTimeout(() => {
			this.setState({
				isOpen: false
			})
		});
		console.log("Onblur " + this.timeOutId)
	}

	onFocusHandler() {
		console.log("OnFocus " + this.timeOutId)
		clearTimeout(this.timeOutId);
	}

	render() {
		return <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
			<button
				className="btn btn-info"
				onClick={this.onClickHandler}
				aria-haspopup="true"
				aria-expanded={this.state.isOpen}>
				Close on outside click
			</button>
			{
				this.state.isOpen && (
					<ul className="list-group col-2">
						<li className="list-group-item">Alpha</li>
						<li className="list-group-item">Beta</li>
						<li className="list-group-item">Gamma</li>
					</ul>
				)
			}
		</div>
	}
}

const FancyButton = React.forwardRef((props, ref) => (
	<button ref={ref} className="btn btn-outline-info">
		{props.children}
	</button>
));


/**
 * 1. The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.
 * 2. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.
 * 3. Libraries that use render props include React Router and Downshift.
 */
class BattleGround extends React.Component {

	constructor(props) {
		super(props);
		this.state = { x: 0, y: 0 };
		this.divRef = React.createRef();
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	onClickHandler(e) {
		if (e.nativeEvent.offsetX < 1010 && e.nativeEvent.offsetY < 250)
			this.setState({
				x: e.nativeEvent.offsetX,
				y: e.nativeEvent.offsetY
			})
	}

	render() {
		return <div>
			<div style={{ height: 300, border: 'groove' }} onClick={this.onClickHandler}>
				{this.props.render(this.state)}
			</div>
			<hr />
			<p>(x, y) : ({this.state.x},{this.state.y})</p>
		</div>
	}
}

class Tank extends React.Component {
	render() {
		const area = this.props.area;
		return <img src="./images/tank.png" style={{ position: 'relative', left: area.x, top: area.y }} />
	}
}

const RenderPropsExample = () => {
	return <div>
		<BattleGround render={area => (
			<Tank area={area} />)
		} />
	</div>
}

/**
 * 1. In the example below, FancyButton uses React.forwardRef to obtain the ref passed to it, 
 * 	  and then forward it to the DOM button that it renders
 * 2. This way, components using FancyButton can get a ref to the underlying button DOM node and 
 *    access it if necessary—just like if they used a DOM button directly
 */
const ForwardRefExample = () => {
	const ref = React.createRef();
	return <FancyButton ref={ref} children="Click Me!" />;
}

/**
 * https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/
 */
class PropsValidationExample extends React.Component {
	render() {
		return <div>
			<h6>{this.props.x} / {this.props.y} = {this.props.x / this.props.y}  ({this.props.email})</h6>
		</div>
	}
}


const isEmail = function (props, propName, componentName) {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!regex.test(props[propName])) {
		return new Error(`Invalid prop ${propName} with value ${props[propName]} passed to ${componentName}. Expected a valid email address.`);
	}
}

PropsValidationExample.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	email: isEmail
}

const OtherConcepts = () => {
	return <Fragment>
		<div className="card">
			<div className="card-body">
				<h5>Mouse and pointer events</h5>
				<SelectExample />
			</div>
			<div className="card-body">
				<h5>ForwardRef Example</h5>
				<ForwardRefExample />
			</div>
			<div className="card-body">
				<h5>RenderProps Example</h5>
				<RenderPropsExample />
			</div>
			<div className="card-body">
				<h5>Props Validation</h5>
				(Check console for Props Validation Errors)
				<PropsValidationExample x={12} y={12} email="abcd@gmail.com" />
				{/* <PropsValidationExample x={12} y="Twelve" />
				<PropsValidationExample x={12} /> */}
			</div>
		</div>
	</Fragment>;
}

export default OtherConcepts;