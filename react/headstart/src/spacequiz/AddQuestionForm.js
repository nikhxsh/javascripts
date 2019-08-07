import React, { Component } from 'react';

/**
 * 1. we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. 
 * 2. The alternative is uncontrolled components, where form data is handled by the DOM itself.
 * 3. To write an uncontrolled component, instead of writing an event handler for every state update, 
 *    you can use a ref to get form values from the DOM.
 * 4. In React, an <input type="file" /> is always an uncontrolled component because its value can only be set by a user, 
 *    and not programmatically.
 * 5. In the React rendering lifecycle, the value attribute on form elements will override the value in the DOM. With an uncontrolled 
 * 	  component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, 
 *    you can specify a defaultValue attribute instead of value.
 */
class AddQuestionForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageUrl: '',
			selected: 'D',
			options: [],
			option: '',
			correctOption: 1,
			note: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleAddOptions = this.handleAddOptions.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name] : event.target.value
		});
	}

	handleCheckboxChange(event) {
		this.setState({
			correctOption: +event.target.value
		});
	}

	handleAddOptions() {
		let options = this.state.options;
		if (!options.some(x => x === this.state.option)) {
			options.push(this.state.option);
			this.setState({
				options: options,
				option: ''
			});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onAddQuestion(this.state);
	}

	render() {
		return <div>
			<h4>New Question</h4>
			<br />
			<form onSubmit={this.handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="options" className="sr-only">Question</label>
						<input
							type="text"
							className="form-control"
							id="questionInput"
							placeholder="Question"
							name="name"
							value={this.state.name}
							onChange={this.handleInputChange} />
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="options" className="sr-only">Image Url</label>
						<input
							type="text"
							className="form-control"
							id="imageUrlInput"
							placeholder="Image Url"
							name="imageUrl"
							value={this.state.imageUrl}
							onChange={this.handleInputChange} />
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<select class="form-control" name="selected" value={this.state.selected} onChange={this.handleInputChange}>
							<option value="A">Grapefruit</option>
							<option value="B">Lime</option>
							<option value="C">Coconut</option>
							<option value="D">Mango</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					{this.state.options.map((option, index) =>
						<div className="form-check" key={index}>
							<input
								className="form-check-input"
								type="radio"
								name="correctOption"
								id={"correctOption-" + index}
								value={index + 1}
								onChange={this.handleCheckboxChange} />
							<label className="form-check-label" htmlFor="gridRadios">
								{option}
							</label>
						</div>
					)}
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="options" className="sr-only">Options</label>
						<input
							type="text"
							className="form-control"
							id="optionInput"
							placeholder="Options"
							name="option"
							value={this.state.option}
							onChange={this.handleInputChange} />
					</div>
					<div className="form-group col-md-6">
						<button
							type="button"
							className="btn btn-primary mb-2"
							onClick={this.handleAddOptions}>+</button>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="options">Note</label>
						<textarea
							className="form-control"
							rows="3"
							name="note"
							value={this.state.note}
							onChange={this.handleInputChange} />
					</div>
				</div>
				<button
					type="submit"
					className="btn btn-primary">Add</button>
			</form>
			<br />
			<p>{JSON.stringify(this.state)}</p>
		</div>
	}
}

export default AddQuestionForm;