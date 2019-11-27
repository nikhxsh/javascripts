import React from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isFunction } from '../helper/utils';

const DataTable = ({
	fieldMappings = [],
	rows = [],
	style = 'table',
	onViewUrl,
	onEditUrl,
	onRemoveUrl
}) => {

	const createHeader = () => {
		let headersList = [];
		fieldMappings.forEach(element => {
			headersList.push(<th scope="col" key={element.key}>{element.header}</th>)
		});
		return headersList;
	}

	const createBody = () => {
		let bodyContent = [];
		rows.forEach((element, index) => {
			let values = [];
			fieldMappings.forEach(field => {
				let value = element[field.key];
				if (isFunction(field.parse))
					values.push(<td key={value}>{field.parse(element[field.key])}</td>)
				else
					values.push(<td key={value}>{element[field.key]}</td>)
			});
			bodyContent.push(
				<tr key={element.id}>
					<td scope="row">{index + 1}</td>
					{values}
					<td align="center">
						<div className="btn-group">
							<button type="button"
								className="btn btn-sm btn-info dropdown-toggle"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Action
							<span className="caret"></span>
							</button>
							<ul className="dropdown-menu">
								{onViewUrl ?
									<li>
										<Link className="dropdown-item" to={onViewUrl.replace(":id", element.id)}>View</Link>
									</li> : <></>
								}
								{onEditUrl ?
									<li>
										<Link className="dropdown-item" to={onEditUrl.replace(":id", element.id)}>Edit</Link>
									</li> : <></>
								}
								{onRemoveUrl ?
									<li>
										<Link className="dropdown-item" to={onEditUrl.replace(":id", element.id)}>Remove</Link>
									</li> : <></>
								}
							</ul>
						</div>
					</td>
				</tr>
			)
		});
		return bodyContent;
	};

	return <table className={style}>
		<thead>
			<tr>
				<th scope="col">#</th>
				{createHeader()}
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			{createBody()}
		</tbody>
	</table>;
};

DataTable.propType = {
	fieldMappings: PropsTypes.array.isRequired,
	rows: PropsTypes.array.isRequired,
	style: PropsTypes.string.isRequired,
	onView: PropsTypes.func.isRequired,
	onEdit: PropsTypes.func.isRequired,
	onRemove: PropsTypes.func.isRequired,
	onSubmit: PropsTypes.func.isRequired
};

export default DataTable;