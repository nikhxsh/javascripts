import React from 'react';

import TextInput from '../../shared/TextInput';
import SelectInput from '../../shared/selectInput';

const WineForm = ({
	colors,
	wine,
	handleChange,
	handleSave,
	formInvalid,
	redirect,
	saving = false
}) => {
	return <>
		<form onSubmit={handleSave}>
			<h4>{wine.id ? 'Edit' : 'Add'} Wine</h4>
			<br />
			<TextInput
				name="name"
				label="Name"
				placeholder="Name"
				value={wine.name}
				onChange={handleChange}
				isRequired={true}
			/>
			<SelectInput
				name="color"
				label="Color"
				options={colors}
				value={wine.color}
				onChange={handleChange}
			/>
			<TextInput
				name="price"
				label="Price"
				placeholder="Price"
				value={wine.price}
				onChange={handleChange}
				isRequired={true}
			/>
			<TextInput
				name="vintage"
				label="Vintage"
				placeholder="Vintage"
				value={wine.vintage}
				onChange={handleChange}
				isRequired={true}
			/>
			<TextInput
				name="score"
				label="Score"
				placeholder="Score"
				value={wine.score}
				onChange={handleChange}
				isRequired={true}
			/>
			<TextInput
				name="rank"
				label="Rank"
				placeholder="Rank"
				value={wine.rank}
				onChange={handleChange}
				isRequired={true}
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

export default WineForm;