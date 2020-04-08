import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import Spinner from '../../shared/spinner';
import DataTable from '../../shared/dataTable';
import EditWineryPage from './EditWinery';
import ViewWineryPage from './ViewWinery';
import { getWineries, deleteWinery } from '../actions/wineshopActions';
import { toast } from 'react-toastify';

const WineryPage = ({
	match,
	wineries,
	getWineries,
	deleteWinery,
	loading
}) => {

	const [selectedWinery, selectWinery] = useState({});

	useEffect(() => {
		getWineries('take=10');
	}, []);

	function handleDelete() {
		deleteWinery(selectedWinery.id)
			.then(() => {
				selectWinery({});
				toast.success('Winery Deleted!!');
			})
			.catch(error => {
			});
	}

	const fieldMappings = [
		{ header: 'Name', key: 'name' },
		{ header: 'Region', key: 'region' },
		{ header: 'Country', key: 'country' },
	];

	const formatTable = () => {
		return loading ?
			(
				<Spinner />
			)
			:
			(
				<>
					<Link to={`${match.url}/add`}>Add New Winery</Link>
					<hr />
					<DataTable
						fieldMappings={fieldMappings}
						rows={wineries}
						allowedFields={['name', 'region', 'country']}
						style={'table table-bordered table-sm table-hover'}
						onViewUrl={`${match.url}/:id/wines`}
						onEditUrl={`${match.url}/:id/edit`}
						onRemoveUrl={`${match.url}/:id/remove`}
					/>
				</>
			)
	}

	return <>
		<div>
			<Route exact path={`${match.url}`} render={() => formatTable()} />
			<Route path={`${match.url}/:wineryId/wines`} component={ViewWineryPage} />
			<Route path={`${match.url}/add`} component={EditWineryPage} />
			<Route path={`${match.url}/:wineryId/edit`} component={EditWineryPage} />
		</div>
	</>
}

WineryPage.propType = {
	match: PropsTypes.object.isRequired,
	loading: PropsTypes.bool.isRequired,
	wineries: PropsTypes.array.isRequired,
	getWineries: PropsTypes.func.isRequired,
	deleteWinery: PropsTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		wineries: state.wineries,
		loading: state.apiCallInProgress
	};
}

const mapDispatchToProps = {
	getWineries,
	deleteWinery
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryPage);