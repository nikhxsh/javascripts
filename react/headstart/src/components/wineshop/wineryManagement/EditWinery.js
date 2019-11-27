import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllCountries } from '../../api/commonApi'
import { saveWinery } from '../actions/wineshopActions';
import { toast } from 'react-toastify';
import { isEqualObject, hasAllValues } from '../../helper/utils';
import WineryForm from './WineryForm';

//Function component
export const EditWineryPage = ({
	history,
	saveWinery,
	winery
}) => {
	const [selectedWinery, setSelectedWinery] = useState({});
	const [saving, toggleSaving] = useState(false);
	const [errors, setErrors] = useState({});
	const [countries, setCountries] = useState([]);
	const [isFormInvalid, setIsFormInvalid] = useState(true);

	useEffect(() => {
		setCountries(getAllCountries());
	}, []);

	useEffect(() => {
		setSelectedWinery(winery);
	}, [winery]);

	useEffect(() => {
		validateForm();
	}, [selectedWinery]);

	function handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;
		setSelectedWinery({
			...selectedWinery,
			[name]: value
		});
	}

	function handleSave(event) {
		event.preventDefault();
		toggleSaving(true);
		setIsFormInvalid(true);
		saveWinery(selectedWinery)
			.then(() => {
				toast.success('Winery Saved!!');
				redirectToWineriesPage();
			})
			.catch(error => {
				toggleSaving(false);
				setIsFormInvalid(false);
				setErrors({ onSave: error.message });
			});
	}

	function validateForm() {
		let oldWinery = winery;
		if (hasAllValues(selectedWinery)) {
			setIsFormInvalid(false);
			if (selectedWinery.id && isEqualObject(selectedWinery, oldWinery)) {
				setIsFormInvalid(true);
			}
		}
		else
			setIsFormInvalid(true);
	}

	const redirectToWineriesPage = () => history.push('/wineries');

	return <>
		{errors.onSave}
		<WineryForm
			countries={countries}
			winery={selectedWinery}
			handleChange={handleChange}
			handleSave={handleSave}
			saving={saving}
			formInvalid={isFormInvalid}
			redirect={redirectToWineriesPage}
		/>
	</>
};

EditWineryPage.propType = {
	match: PropsTypes.object.isRequired,
	winery: PropsTypes.object.isRequired,
	history: PropsTypes.object.isRequired,
	saveWinery: PropsTypes.func.isRequired
}

export function getWineryById(wineries, id) {
	return wineries.find(winery => winery.id === id) || emptyWinery;
}

function mapStateToProps(state, ownProps) {
	const wineryId = ownProps.match.params.wineryId;
	const winery = wineryId ? getWineryById(state.wineries, wineryId) : emptyWinery;
	return {
		winery
	};
}

const mapDispatchToProps = {
	saveWinery
}

const emptyWinery = { name: "", region: "", country: "India" };

export default connect(mapStateToProps, mapDispatchToProps)(EditWineryPage);