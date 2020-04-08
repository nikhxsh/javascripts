import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { toTitleCase } from '../helper/utils';

const TextInput = ({
	name,
	label,
	onChange,
	placeholder,
	value,
	isRequired
}) => {

	const [validationError, setValidationError] = useState({
		display: false,
		inputClass: 'form-control',
		feedbackClass: '',
		message: ''
	});

	const onfocusout = (event) => {
		event.preventDefault();
		validate(event);
	}

	const onTextchange = (event) => {
		event.preventDefault();
		validate(event);
		onChange(event);
	}

	const validate = (event) => {
		if (!isRequired) return;

		const { name, value } = event.target;
		if (value.length == 0) {
			setValidationError({
				display: true,
				inputClass: 'form-control is-invalid',
				feedbackClass: 'invalid-feedback',
				message: `${toTitleCase(name)} is required.`
			})
		}
		else
			setValidationError({
				display: false,
				inputClass: 'form-control is-valid'
			});
	}

	return <div className="form-row">
		<div className="form-group col-md-6">
			<label>{label}</label>
			<input
				type="text"
				className={validationError.inputClass}
				id={name}
				placeholder={placeholder}
				name={name}
				value={value || ''}
				onChange={onTextchange}
				onBlur={onfocusout} />
			<div className={validationError.feedbackClass}>
				{validationError.message}
			</div>
		</div>
	</div>
};

TextInput.propType = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	isRequired: PropTypes.string.isRequired
};

export default TextInput;