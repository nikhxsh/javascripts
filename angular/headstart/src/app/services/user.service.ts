import { Injectable } from "@angular/core";
import { IUser } from '../ngrxstore/models/config.contract';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
	apiUrl = `${environment.mokcUsersApiBase}/5cee83c3300000c83a6e9c3f?mocky-delay=100ms`;
	
	constructor(private http: HttpClient){
	}

	getUsers() : Observable<IUser[]> {
		return this.http.get<IUser[]>(this.apiUrl);
	}
}