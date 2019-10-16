export const baseUrl = "http://localhost:58725/api";

export async function handleResponse(response) {
	if (response.ok) return await response.json();
	if (response.status === 400) {
		const error = await response.text();
		throw new Error(error);
	}
	throw new Error("Network error");
}

export function handleError(error) {
	console.error("API Called Failed. " + error)
	throw error;
}