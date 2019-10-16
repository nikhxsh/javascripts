import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
	name,
	label,
	options,
	value,
	onChange,
	error
}) => {
	return <div className="form-row">
		<label htmlFor="options" className="sr-only">{label}</label>
		<div className="form-group col-md-6">
			<select class="form-control" name={name} value={value} onChange={onChange}>
				{options.map(option =>
					<option key={option.code} value={option.name}>
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
	options: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.object.isRequired,
};

export default SelectInput;