import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getWinery } from '../api/wineShopApi';
import TextInput from '../shared/TextInput';
import SelectInput from '../shared/selectInput';
import { getAllCountries } from '../api/commonApi'
import { saveWinery } from './actions/wineshopActions';

//Function component
const WineryForm = ({
	match,
	history,
	saveWinery,
	...props
}) => {
	const [winery, setWinery] = useState({ ...props.winery });
	const [saving, toggleSaving] = useState(false);
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		setWinery({ ...props.winery });
		setCountries(getAllCountries());
	}, []);

	function handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;
		setWinery(prevWinery => ({
			...prevWinery,
			[name]: value
		}));
	}

	function handleSave(event) {
		event.preventDefault();
		toggleSaving(prev => !prev);
		saveWinery(winery).then(() => {
			toggleSaving(prev => !prev);
			history.push('/wineries');
		});
	}

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
			/>
			<TextInput
				name="region"
				label="Region"
				placeholder="Winery Region"
				value={winery.region}
				onChange={handleChange}
			/>
			<SelectInput
				name="country"
				label="Country"
				options={countries}
				value={winery.country}
				onChange={handleChange}
			/>
			<div className="form-row">
				<button type="submit" className="btn btn-primary">
					{saving ? "Saving..." : "Save"}
				</button>
				&nbsp;
			    <Link className="btn btn-warning" to={'/wineries'}>Back</Link>
			</div>
		</form>
		<div className="alert alert-light" >
		</div>
	</>
};

WineryForm.propType = {
	match: PropsTypes.object.isRequired,
	winery: PropsTypes.object.isRequired,
	history: PropsTypes.object.isRequired,
	saveWinery: PropsTypes.func.isRequired
}

export function getWineryById(wineries, id) {
	return wineries.find(winery => winery.id === id);
}

function mapStateToProps(state, ownProps) {
	const wineryId = ownProps.match.params.id;
	return {
		winery: wineryId ? getWineryById(state.wineries, wineryId) : { name: '', region: '', country: '' }
	};
}

const mapDispatchToProps = {
	saveWinery
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryForm);