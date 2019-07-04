import React, { Component } from 'react';
import questions from './questions'
import './spaceQuiz.css';
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

class Header extends Component {
	render() {
		return <div className="row">
			<div className="col-10 offset-1">
				<h1 className="display-4">Space Quiz</h1>
				<p className="lead">You scored {this.props.score}%</p>
				<hr className="my-4" />
			</div>
		</div>
	};
}

class QuizPanel extends Component {
	optionRefs = {};

	constructor(props) {
		super(props);
		this.state = {
			questionId: this.props.question.id,
			isCorrectAnswer: false,
			isAttempted: false,
			attempts: 0
		};
		this.optionRefs = Array(this.props.question.options.length).fill(0).map(() => React.createRef());
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.questionId !== nextProps.question.id)
			this.state = {
				questionId: this.props.question.id,
				isCorrectAnswer: false,
				isAttempted: false,
				attempts: 0
			};
	}

	getChildReference(index) {
		if (!this.optionRefs.hasOwnProperty(index))
			this.optionRefs[index] = React.createRef();
		return this.optionRefs[index];
	}

	handleAnswerSelected = (isCorrect) => {
		const attempts = this.state.attempts + 1;
		this.setAnswerStatus(isCorrect, attempts);
		const correctOption = this.props.question.correctOption;
		let optionRef = this.getChildReference(correctOption);
		if (optionRef) {
			optionRef.current.highlightRightAnswer(correctOption);
		}
		console.log(attempts);
		this.props.toggleNextButton(isCorrect, attempts);
	}

	setAnswerStatus(isCorrect, attempts) {
		this.setState({
			isCorrectAnswer: isCorrect,
			isAttempted: true,
			attempts: attempts
		});
	}

	renderNote() {
		if (this.state.isAttempted)
			return <div className="col-10 offset-1">
				<div className="alert alert-info">
					{this.props.question.note}
				</div>
			</div>
		else
			return <div></div>
	}

	render() {
		return <div className="row">
			<div className="col-4 offset-1">
				<img src={this.props.question.imageUrl} className="img-thumbnail" />
			</div>
			<div className="col-6">
				<div className="alert alert-primary">
					{this.props.question.name}
				</div>
				<ul className="list-group">
					{this.props.question.options.map(
						(option, index) =>
							<Option
								value={option}
								key={option}
								optionIndex={index + 1}
								answer={this.props.question.correctOption}
								onAnswerSelected={(value) => { this.handleAnswerSelected(value) }}
								ref={this.getChildReference(index + 1)} />
					)}
				</ul>
			</div>
			{this.renderNote()}
		</div>
	};
}

class Option extends Component {

	constructor(props) {
		super(props);
		this.state = {
			highlight: ''
		}
	}

	mapping = {
		1: 'green',
		2: 'red'
	};

	onAnswerSelected() {
		const isAnswerCorrect = this.props.answer === this.props.optionIndex;
		this.props.onAnswerSelected(isAnswerCorrect);
		this.setState({
			highlight: isAnswerCorrect ? this.mapping[1] : this.mapping[2]
		});
	}

	highlightRightAnswer(correctOption) {
		if (this.props.optionIndex == correctOption)
			this.setState({
				highlight: this.mapping[1]
			});
	}

	render() {
		return <div
			className='option'
			onClick={() => { this.onAnswerSelected() }}
			style={{ backgroundColor: this.state.highlight }}>
			<strong>{this.props.value}</strong>
		</div >
	}
}

class Continue extends Component {

	getFinishButton() {
		if (this.props.stop)
			return <button
				type="button"
				className="btn btn-outline-primary"
				onClick={() => { this.props.restartQuiz() }}>
				Finish
			</button>;
	}

	render() {
		return <div className="row">
			<div className="col-10 offset-1">
				<hr className="my-4" />
				<button
					type="button"
					className="btn btn-outline-primary"
					disabled={this.props.continue || this.props.stop}
					onClick={() => { this.props.nextQuestion() }}>
					Next
				</button>
				&nbsp;
				{this.getFinishButton()}
			</div>
		</div>
	};
}

function Footer() {
	return <div id="footer" className="row">
		<div className="col-12">
			<br />
			<p className="text-muted credit">
				Source: NASA Astronomical Data Center
				</p>
		</div>
	</div>
}

class SpaceQuiz extends Component {

	constructor() {
		super();
		this.state = {
			questionNumber: 1,
			quizData: this.getQuizData(1),
			totalQuestions: questions.length,
			answeredCorrect: false,
			disableNext: true,
			score: 0
		};
	}

	getQuizData(id) {
		let data = questions.find(x => x.id === id);
		return {
			question: data,
			enablePanel: true
		};
	}

	toggleNextButton(isCorrect, attempts) {
		const score = attempts === 1 && isCorrect ? this.state.score + 10 : this.state.score;
		this.setState({
			answeredCorrect: isCorrect,
			disableNext: false,
			score: score
		})
	}

	handleNextQuestion() {
		let next = this.state.questionNumber + 1;
		if (next > this.state.totalQuestions) {
			this.setState({
				finished: true
			});
		}
		else {
			this.setState({
				questionNumber: next,
				quizData: this.getQuizData(next),
				answeredCorrect: false,
				disableNext: true
			});
		}
	}

	handleRestartQuiz() {
		this.setState({
			questionNumber: 1,
			quizData: this.getQuizData(1),
			answeredCorrect: false,
			finished: false,
			score: 0
		});
	}

	render() {
		return <div className="App">
			<Header score={this.state.score} />
			<QuizPanel
				{...this.state.quizData}
				toggleNextButton={(isCorrect, attempts) => { this.toggleNextButton(isCorrect, attempts) }} />
			<Continue
				continue={this.state.disableNext}
				nextQuestion={() => { this.handleNextQuestion() }}
				stop={this.state.finished}
				restartQuiz={() => { this.handleRestartQuiz() }} />
			<Footer />
		</div>
	}
}

export default SpaceQuiz;


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