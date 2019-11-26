import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
	name,
	label,
	options,
	value,
	onChange
}) => {
	return <div className="form-row">
		<div className="form-group col-md-6">
			<label htmlFor="options">{label}</label>
			<select
				className="form-control"
				name={name}
				value={value}
				onChange={onChange}>
				{options.map(option =>
					<option key={option.code} value={option.code}>
						{option.name}
					</option>
				)}
			</select>
		</div>
	</div>
};

SelectInput.propType = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;