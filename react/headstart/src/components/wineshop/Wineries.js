import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import Spinner from '../shared/spinner';
import Modal from '../shared/modal';
import ManageWineryPage from './ManageWineryPage';
import { getWineries, deleteWinery } from './actions/wineshopActions';
import { toast } from 'react-toastify';

const WineryPage = ({
	match,
	wineries,
	getWineries,
	deleteWinery,
	loading
}) => {

	const [selectedWinery, selectWinery] = useState({});
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		getWineries("take=100");
	}, []);

	function handleDelete() {
		deleteWinery(selectedWinery.id)
			.then(() => {
				setShowDialog(false);
				selectWinery({});
				toast.success('Winery Deleted!!');
			})
			.catch(error => {
			});
	}

	function handleClose() {
		setShowDialog(false);
	}

	function openDialog(winery) {
		selectWinery(winery);
		setShowDialog(true);
	}

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
					<table className="table table-bordered table-sm table-hover">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Region</th>
								<th scope="col">Country</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{
								wineries.map((x, index) =>
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{x.name}</td>
										<td>{x.region}</td>
										<td>{x.country}</td>
										<td align="center"><Link to={`${match.url}/${x.id}/edit`}><i className="glyphicon glyphicon-edit"></i></Link>
											&nbsp;&nbsp;&nbsp;
											<a onClick={() => openDialog(x)} data-toggle="modal" data-target="#confirmationModal">
												<i className="glyphicon glyphicon-remove-sign"></i>
											</a>
										</td>
									</tr>
								)
							}
						</tbody>
					</table>
					<Modal handleSubmit={handleDelete} handleClose={handleClose} show={showDialog} header="Warning!">
						<p>Are you sure that you want to remove winery <b>{selectedWinery.name}</b>?</p>
					</Modal>
				</>
			)
	}

	return <>
		<div>
			<Route exact path={`${match.url}`} render={() => formatTable()} />
			<Route path={`${match.url}/add`} component={ManageWineryPage} />
			<Route path={`${match.url}/:id/edit`} component={ManageWineryPage} />
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