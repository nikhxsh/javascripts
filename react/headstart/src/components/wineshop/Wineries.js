import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import WineryForm from './WineryForm';
import { getWineries } from './actions/wineshopActions';

class WineryPage extends React.Component {

	componentDidMount() {
		this.props.getWineries("take=100");
	}

	render() {
		return <>
			<Route exact path={`${this.props.match.url}`} render={
				() =>
					<>
						<Link to={`${this.props.match.url}/add`}>Add New Winery</Link>
						<div>
							<br />
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
										this.props.wineries.map((x, index) =>
											<tr key={index}>
												<th scope="row">{index + 1}</th>
												<td>{x.name}</td>
												<td>{x.region}</td>
												<td>{x.country}</td>
												<td><Link to={`${this.props.match.url}/${x.id}/edit`}>Edit</Link></td>
											</tr>
										)
									}
								</tbody>
							</table>
						</div>
					</>
			} />
			<Route path={`${this.props.match.url}/add`} component={WineryForm} />
			<Route path={`${this.props.match.url}/:id/edit`} component={WineryForm} />
		</>
	}
}

WineryPage.propType = {
	wineries: PropsTypes.object.isRequired,
	actions: PropsTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		wineries: state.wineries
	};
}

const mapDispatchToProps = {
	getWineries
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryPage);