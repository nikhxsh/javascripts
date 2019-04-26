import { Injectable } from '@angular/core'
import { Headers, Response, RequestOptions, Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PagingRequest } from "../models/common.model";
import * as Global from '../global';
import { HandleError } from "../helpers/error.utility";
import { Wine } from '../models/winery.model';

@Injectable()
export class WineryService {

	constructor(private httpRef: Http) {
	}

	//Return Observable
	// - An Observable is like a Stream (in many languages) and allows to pass zero or more events
	//   where the callback is called for each event.
	// - cancellable
	public _getAll(): Observable<Wine[]> {
		return this.httpRef.get(Global.API_GET_ALL_WINES)
			.map(response => response.json() as Wine[]) //calling .json() on the response to return data
			.catch(HandleError.handle);
	}  

	//Return Promise	
	// - A Promise handles a single event when an async operation completes or fails
	//   Note: There are Promise libraries out there that support cancellation, but ES6 Promise doesn't so far
	// - not cancellable
	public _getWineById(beerId): Promise<Wine> {      
		return this.httpRef.get(Global.API_GET_ALL_WINES + beerId)
			.toPromise()
			.then(response => response.json().result as Wine)
			.catch(HandleError.handle);
	}  
}