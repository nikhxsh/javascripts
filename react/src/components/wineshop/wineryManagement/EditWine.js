import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveWinery } from '../actions/wineshopActions';
import { emptyWine, wineColors } from '../shared/wineshopModel';
import { toast } from 'react-toastify';
import { isEqualObject, hasAllValues } from '../../helper/utils';
import WineForm from './WineForm';

//Function component
export const EditWinePage = ({
	history,
	saveWine,
	wine
}) => {
	const [selectedWine, setSelectedWine] = useState({});
	const [saving, toggleSaving] = useState(false);
	const [errors, setErrors] = useState({});
	const [isFormInvalid, setIsFormInvalid] = useState(true);

	useEffect(() => {
	}, []);

	useEffect(() => {
		setSelectedWine(wine);
	}, [wine]);

	useEffect(() => {
		validateForm();
	}, [selectedWine]);

	function handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;
		setSelectedWine({
			...selectedWine,
			[name]: value
		});
	}

	function handleSave(event) {
		event.preventDefault();
		toggleSaving(true);
		setIsFormInvalid(true);
		saveWinery(selectedWine)
			.then(() => {
				toast.success('Winery Saved!!');
				redirectToWineryInfoPage();
			})
			.catch(error => {
				toggleSaving(false);
				setIsFormInvalid(false);
				setErrors({ onSave: error.message });
			});
	}

	function validateForm() {
		let oldWine = wine;
		if (hasAllValues(selectedWine)) {
			setIsFormInvalid(false);
			if (selectedWine.id && isEqualObject(selectedWine, oldWine)) {
				setIsFormInvalid(true);
			}
		}
		else
			setIsFormInvalid(true);
	}

	const redirectToWineryInfoPage = () => history.go(-1);

	return <>
		{errors.onSave}
		<WineForm
			colors={wineColors}
			wine={selectedWine}
			handleChange={handleChange}
			handleSave={handleSave}
			saving={saving}
			formInvalid={isFormInvalid}
			redirect={redirectToWineryInfoPage}
		/>
	</>
};

EditWinePage.propType = {
	match: PropsTypes.object.isRequired,
	wine: PropsTypes.object.isRequired,
	history: PropsTypes.object.isRequired,
	saveWine: PropsTypes.func.isRequired
}

export function getWineById(wineries, wineryId, wineId) {
	let winery = wineries.find(winery => winery.id === wineryId);
	return winery.products.find(wine => wine.id === wineId) || emptyWine;
}

function mapStateToProps(state, ownProps) {
	const wineryId = ownProps.match.params.wineryId;
	const wineId = ownProps.match.params.wineId;
	const wine = wineId ? getWineById(state.wineries, wineryId, wineId) : emptyWine;
	return {
		wine
	};
}

const mapDispatchToProps = {
	saveWinery
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWinePage);