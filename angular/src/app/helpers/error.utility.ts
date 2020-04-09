export class HandleError {
	public static handle(error: any): Promise<any> {
		console.error('An error occurred: ', error);
		return Promise.reject(error.message || error);
	}

	public static logToConsole(message: any): Promise<any> {
		console.error('An error occurred: ', message);
		return Promise.reject(message.message || message);
	}
}