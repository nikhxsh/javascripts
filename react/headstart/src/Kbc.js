import React, { Component } from 'react';
import logo from './logo.svg';
import './Kbc.css';
import './bootstrap.min.css'
/**
 * Props + State => Model
 * Model + Component => DOM (Virtual)
 * DOM Events => Sends back to State and trigger another render cycle
 * 
 * React:
 *  1. Renders UI and Handles event
 *  2. Uses plain javascript for view logic
 *  3. Written in plain javascript
 */

function Header() {
	return (
		<div className="row">
			<div className="jumbotron col-10 offset-1">
				<h1>Kaun Banega Crorepati</h1>
				<p>Answer it to win the money!</p>
			</div>
		</div>
	);
}

function QuestionAnswer({ question, answers }) {
	return (
		<div className="row QnA" style={{ backgroundColor: 'white' }}>
			<div className="col-4 offset-1">
				<img src={question.imageUrl} className="image" />
			</div>
			<div className="col-6">
				{answers.map((q) => <p>{q}</p>)}
			</div>
		</div>
	);
}

function Continue() {
	return (<div></div>);
}

function Footer() {
	return (
		<div id="footer" className="row">
			<div className="col-12">
				<p className="text-muted credit">
					Copyright!
				</p>
			</div>
		</div>
	);
}

class Kbc extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<QuestionAnswer />
				<Continue />
				<Footer />
			</div>
		)
	}
}

export default Kbc;


/*
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<div onClick={this.props.onClick}>This div clicked {this.props.clicks} times.</div>
</header>

JSX to Javascript

<h1>
 <Sum a={4} b={5} />
</h1>

will be converted as

React.createElement(
	'h1',
	null,
	React.createElement(
		Sum, //Component
		{a:4,B;5}, //props or model
		null //Child component
	)
)

spread attribute

const props = {a:4,B;5};
const element = <Sum {...props} />;
*/