import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { getWinesFromWinery } from './actions/wineshopActions';
import EditWinePage from './EditWine';
import Spinner from '../shared/spinner';

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
							<table className="table table-bordered table-sm table-hover">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Name</th>
										<th scope="col">Color</th>
										<th scope="col">Price</th>
										<th scope="col">Vintage</th>
										<th scope="col">Score</th>
										<th scope="col">Rank</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{
										selectedWinery.products ? selectedWinery.products.map((x, index) =>
											<tr key={index}>
												<th scope="row">{index + 1}</th>
												<td>{x.name}</td>
												<td>{x.color}</td>
												<td>{x.price}</td>
												<td>{x.vintage}</td>
												<td>{x.score}</td>
												<td>{x.rank}</td>
												<td align="center">
													<div class="btn-group">
														<button type="button"
															class="btn btn-sm btn-info dropdown-toggle"
															data-toggle="dropdown"
															aria-haspopup="true"
															aria-expanded="false">
															Action
													<span class="caret"></span>
														</button>
														<ul class="dropdown-menu">
															<li>
																<Link class="dropdown-item" to={`${match.url}/${x.id}/edit`}>Edit</Link>
															</li>
														</ul>
													</div>
												</td>
											</tr>
										) : <></>
									}
								</tbody>
							</table>
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

const emptyWinery = { name: "", region: "", country: "", products: [] };

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