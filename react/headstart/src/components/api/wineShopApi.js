import { handleResponse, handleError, baseUrl } from "./apiUtils";


export function getWineries(queryString) {

	return fetch(`${baseUrl}/wineries?${queryString}`)
		.then(handleResponse)
		.catch(handleError);
}

export function getWinery(wineryId) {

	return fetch(`${baseUrl}/wineries/${wineryId}`)
		.then(handleResponse)
		.catch(handleError);
}

export function saveWinery(winery) {

	const payload =
	{
		method: winery.id ? 'PUT' : 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(winery)
	};

	return fetch(`${baseUrl}/wineries`, payload)
		.then(handleResponse)
		.catch(handleError);
}

export function deleteWinery(wineryId) {

	const payload =
	{
		method: 'DELETE'
	};

	return fetch(`${baseUrl}/wineries/${wineryId}`, payload)
		.then(handleResponse)
		.catch(handleError);
}

export function getWinesFromWinery(wineryId, queryString) {

	return fetch(`${baseUrl}/wineries/${wineryId}/wines?${queryString}`)
		.then(handleResponse)
		.catch(handleError);
}