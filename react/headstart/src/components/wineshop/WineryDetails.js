import React from 'react';

class WineriesPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Wineries: [],
			TotalWineries: 0
		};
	}

	componentDidMount() {
		this.GetWineryDetails();
	}

	GetWineryDetails() {
		fetch('http://localhost:58725/api/winery')
			.then(res => res.json())
			.then
			(
				(res) => {
					this.setState({
						Wineries: res.result,
						TotalWineries: res.total
					})
				},
				(error) => {
				}
			);
	}

	render() {
		return <div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Region</th>
						<th scope="col">Country</th>
					</tr>
				</thead>
				<tbody>
					{
						this.state.Wineries.map((x, index) =>
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{x.name}</td>
								<td>{x.region}</td>
								<td>{x.country}</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
	}
}

export default WineriesPage;