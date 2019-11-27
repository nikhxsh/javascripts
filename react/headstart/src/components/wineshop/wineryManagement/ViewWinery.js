import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getWinesFromWinery } from '../actions/wineshopActions';
import { emptyWinery, wineColors } from '../shared/wineshopModel';
import DataTable from '../../shared/dataTable';
import EditWinePage from './EditWine';
import Spinner from '../../shared/spinner';

//Function component
export const ViewWineryPage = ({
	history,
	match,
	winery,
	getWinesFromWinery,
	loading
}) => {
	const [selectedWinery, setSelectedWinery] = useState({});

	useEffect(() => {
		if (winery && winery.id) {
			setSelectedWinery(winery);
			if (!winery.products)
				getWinesFromWinery(winery.id, "take=10");
		}
	}, [winery]);


	function getWineColor(code) {
		let wineColor = wineColors.find(x => x.code === code);
		return wineColor.name || '';
	};

	const fieldMappings = [
		{ header: 'Name', key: 'name' },
		{ header: 'Color', key: 'color', parse: getWineColor },
		{ header: 'Vintage', key: 'vintage' },
		{ header: 'Score', key: 'score' },
		{ header: 'Rank', key: 'rank' }
	];

	const redirectToWineriesPage = () => history.go(-1);

	const formatWineryTable = () => {
		return loading ?
			(
				<Spinner />
			)
			:
			(
				<>
					<div className="card">
						<div className="card-header">
							<b>{selectedWinery.name}</b>, {selectedWinery.region}, {selectedWinery.country}.
					</div>
						<div className="card-body">
							<b>Wines</b>
							<hr />
							<DataTable
								fieldMappings={fieldMappings}
								rows={selectedWinery.products}
								style={'table table-bordered table-sm table-hover'}
								onEditUrl={`${match.url}/:id/edit`}
								onRemoveUrl={`${match.url}/:id/remove`}
							/>
						</div>
					</div>
					<br />
					<button className="btn btn-info" onClick={redirectToWineriesPage}>Back</button>
				</>
			)
	};

	return <div>
		<Route exact path={`${match.url}`} render={() => formatWineryTable()} />
		<Route path={`${match.path}/:wineId/edit`} component={EditWinePage} />
	</div>;
};

ViewWineryPage.propType = {
	match: PropsTypes.object.isRequired,
	history: PropsTypes.object.isRequired,
	loading: PropsTypes.bool.isRequired,
	winery: PropsTypes.object.isRequired,
	getWinesFromWinery: PropsTypes.func.isRequired,
}

export function getWineryById(wineries, id) {
	return wineries.find(winery => winery.id === id);
}

function mapStateToProps(state, ownProps) {
	const wineryId = ownProps.match.params.wineryId;
	return {
		winery: wineryId && state.wineries.length > 0 ? getWineryById(state.wineries, wineryId) : emptyWinery,
		loading: state.apiCallInProgress
	}
}

const mapDispatchToProps = {
	getWinesFromWinery,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewWineryPage);