import React from 'react';

import TextInput from '../shared/TextInput';
import SelectInput from '../shared/selectInput';

const WineryForm = ({
	countries,
	winery,
	handleChange,
	handleSave,
	formInvalid,
	saving = false
}) => {
	return <>
		<form onSubmit={handleSave}>
			<h4>{winery.id ? 'Edit' : 'Add'} Winery</h4>
			<br />
			<TextInput
				name="name"
				label="Name"
				placeholder="Winery Name"
				value={winery.name}
				onChange={handleChange}
				isRequired={true}
			/>
			<TextInput
				name="region"
				label="Region"
				placeholder="Winery Region"
				value={winery.region}
				onChange={handleChange}
				isRequired={true}
			/>
			<SelectInput
				name="country"
				label="Country"
				options={countries}
				value={winery.country}
				onChange={handleChange}
			/>
			<div className="form-row">
				<button type="submit" className="btn btn-info" disabled={formInvalid}>
					{saving ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	</>
};

export default WineryForm;