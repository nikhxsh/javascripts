async function handleResponse(response) {
	if (response.ok) return await response.json();
	if (response.status === 400) {
		const error = await response.text();
		throw new Error(error);
	}
	console.log("Resonse" + response);
}

async function handleError(error) {
	console.log("API Call Failed. " + error);
}

export { handleResponse, handleError }