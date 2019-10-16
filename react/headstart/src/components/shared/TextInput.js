import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
	name,
	label,
	onChange,
	placeholder,
	value
}) => {
	return <div className="form-row">
		<div className="form-group col-md-6">
			<label htmlFor="options" className="sr-only">{label}</label>
			<input
				type="text"
				className="form-control"
				id={name}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange} />
		</div>
	</div>
};

TextInput.propType = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default TextInput;