import React from 'react';

import TextInput from '../../shared/TextInput';
import SelectInput from '../../shared/selectInput';

const WineryForm = ({
	countries,
	winery,
	handleChange,
	handleSave,
	formInvalid,
	redirect,
	saving = false
}) => {

	const countryCode = countries.length > 0 ? countries.find(x => x.name === winery.country).code : 'IN';

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
				value={countryCode}
				onChange={handleChange}
			/>
			<br />
			<div className="form-row">
				<button type="submit" className="btn btn-info mr-2" disabled={formInvalid}>
					{saving ? "Saving..." : "Save"}
				</button>
				<button type="button" className="btn btn-info" onClick={redirect}>Back</button>
			</div>
		</form>
	</>
};

export default WineryForm;