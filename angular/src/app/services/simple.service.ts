import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';

/**
 * @Injectable is actually a shortcut for having to decorate every parameter in your constructor with @Inject
 * We only need to use @Injectable on classes which don’t already use one of the other Angular decorators
 * We use the @Injectable class decorators to automatically resolve and inject all the parameters of class constructor.
 */
@Injectable({
	providedIn: 'root'
})
export class SimpleService {
	apiRoot: string = "http://httpbin.org";

	/**
	 * without @Injectable, We need to explicitly tell Angular what we want injected for the otherService parameter so 
	 * we use the @Inject, like:
	 * constructor(@Inject(HttpClient) http: HttpClient) { }
	 * The first param to @Inject is the token we want to resolve this dependency with.
	 */
	constructor(private http: HttpClient) { }

	/**
	 * This returns an observable which for now we are just going to subscribe to and return response
	 */
	doGET() {
		let url = `${this.apiRoot}/get`;
		let params = new HttpParams({
			fromObject: {
				page: '10',
				get: 'orange',
			}
		});
		return this.http.get(url, { params });
	}

	doPOST() {
		let url = `${this.apiRoot}/post`;
		let params = new HttpParams({
			fromObject: {
				page: '20'
			}
		});
		return this.http.post(url, { moo: "Hell", koo: "Yeah" }, { params });
	}

	doPUT() {
		let url = `${this.apiRoot}/put`;
		let params = new HttpParams({
			fromObject: {
				page: '10'
			}
		});
		return this.http.put(url, { moo: "Hell", koo: "Yeah" }, { params })
	}

	doDELETE() {
		let url = `${this.apiRoot}/delete`;
		let params = new HttpParams({
			fromObject: {
				type: 'orange',
				id: '1234'
			}
		});
		return this.http.delete(url, { params })
	}

	doGETAsPromise() {
		let url = `${this.apiRoot}/get`;
		return this.http.get(url)
			.toPromise();
	}

	doGETAsPromiseError() {
		let url = `${this.apiRoot}/post`;
		return this.http.get(url)
			.toPromise();
	}

	doGETAsObservableError() {
		let url = `${this.apiRoot}/post`;
		return this.http.get(url);
	}

	doGETWithHeaders() {
		let headers = new HttpHeaders({
			'Authorization': btoa('username:password')
		});
		let url = `${this.apiRoot}/get`;
		return this.http.get(url, { headers });
	}
}