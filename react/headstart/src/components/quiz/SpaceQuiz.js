import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom';
import './spaceQuiz.css';

import AddQuestionForm from './AddQuestionForm';
import questions from './data.json'

class Header extends Component {

	mappingColor = {
		true: 'alert alert-success',
		false: 'alert alert-danger'
	}

	getValues() {
		if (this.props.attempted)
			return this.mappingColor[this.props.correct];
		return 'alert alert-info';
	}

	render() {
		return <div className="row">
			<div className="col-10 offset-1">
				<div className={this.getValues()}>
					<strong>Total Score: {this.props.score}</strong>
				</div>
			</div>
		</div>
	};
}

class QuizPanel extends Component {
	optionRefs = {};
	constructor(props) {
		super(props);
		this.init(this.props);
		this.optionRefs = Array(this.props.question.options.length).fill(0).map(() => React.createRef());
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	init(props) {
		this.state = {
			questionId: props.question.id,
			isCorrectAnswer: false,
			isAttempted: false,
			attempts: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.questionId !== nextProps.question.id) {
			this.init(nextProps);
		}
	}

	getChildReference(index) {
		if (!this.optionRefs.hasOwnProperty(index))
			this.optionRefs[index] = React.createRef();
		return this.optionRefs[index];
	}

	handleAnswerSelected(isCorrect) {
		this.highlightRightAnswer();
		const attempts = this.state.attempts + 1;
		this.setAnswerStatus(isCorrect, attempts);
		this.props.toggleNextButton(isCorrect, attempts);
	}

	highlightRightAnswer() {
		const correctOption = this.props.question.correctOption;
		let optionRef = this.getChildReference(correctOption);
		if (optionRef) optionRef.current.highlightRightAnswer(correctOption);
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
	}

	render() {
		return <div className="row">
			<div className="col-4 offset-1">
				<img src={this.props.question.imageUrl} className="img-thumbnail image" />
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
								onAnswerSelected={this.handleAnswerSelected}
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
		this.onAnswerSelected = this.onAnswerSelected.bind(this);
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
			onClick={this.onAnswerSelected}
			style={{ backgroundColor: this.state.highlight }}>
			{this.props.value}
		</div >
	}
}

class SpaceQuiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionNumber: 1,
			quizData: this.getQuizData(1),
			totalQuestions: questions.length,
			answeredCorrect: false,
			disableNext: true,
			isAttempted: false,
			score: 0
		};
		this.toggleNextButton = this.toggleNextButton.bind(this);
		this.handleNextQuestion = this.handleNextQuestion.bind(this);
		this.handleRestartQuiz = this.handleRestartQuiz.bind(this);
	}

	getQuizData(id) {
		let data = questions.find(x => x.id === id);
		return {
			question: data
		};
	}

	toggleNextButton(isCorrect, attempts) {
		const score = attempts === 1 && isCorrect ? this.state.score + 10 : this.state.score;
		this.setState({
			answeredCorrect: isCorrect,
			disableNext: false,
			score: score,
			isAttempted: true
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
				disableNext: true,
				isAttempted: false
			});
		}
	}

	handleRestartQuiz() {
		this.setState({
			questionNumber: 1,
			quizData: this.getQuizData(1),
			answeredCorrect: false,
			finished: false,
			isAttempted: false,
			score: 0
		});
	}

	render() {
		return <div className="spaceQuiz">
			<Header
				score={this.state.score}
				correct={this.state.answeredCorrect}
				attempted={this.state.isAttempted} />
			<QuizPanel
				{...this.state.quizData}
				toggleNextButton={this.toggleNextButton} />
			<div className="row">
				<div className="col-10 offset-1">
					<hr className="my-4" />
					<button
						type="button"
						className="btn btn-outline-primary"
						disabled={this.state.disableNext || this.state.finished}
						onClick={this.handleNextQuestion}>
						Next
					</button>
					&nbsp;
					{
						this.state.finished ?
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={this.handleRestartQuiz}>
								Finish
							</button> : ''
					}
				</div>
			</div>
		</div>
	}
}

class SpaceQuizApp extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<Link to={`${this.props.match.url}/add`}>Add new question</Link> |&nbsp;
			<Link to={`${this.props.match.url}`}>Back</Link>
			<hr />
			<Route exact path={`${this.props.match.url}`} component={SpaceQuiz} />
			<Route path={`${this.props.match.url}/add`} component={QuizDataWrapper} />
		</div>
	};
}


const QuizDataWrapper = withRouter(({ history }) =>
	<AddQuestionForm onAddQuestion={(question) => {
		question.id = questions.length + 1;
		questions.push(question);
		history.push('/spacequiz')
	}} />);

export default SpaceQuizApp;