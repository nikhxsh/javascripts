import { Injectable } from "@angular/core";
import { IAccount } from '../ngrxstore/models/account.contract';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
	apiUrl = `${environment.mokcUsersApiBase}/5cee83c3300000c83a6e9c3f?mocky-delay=100ms`;
	fakeData : IAccount[];
	
	constructor(private http: HttpClient){
		this.initFakeData();
	}

	getAccounts() : Observable<IAccount[]> {
		//return this.http.get<IAccount[]>(this.apiUrl);
		return of(this.fakeData)
	}

	addAccount(account : IAccount) : void {
		//return this.http.get<IAccount[]>(this.apiUrl);
		this.fakeData.push(account);
	}

	initFakeData() {
		this.fakeData = [
			{ accountNumber: 12345678, amount: 34.56 },			
			{ accountNumber: 78945612, amount: 12.36 }
		];
	}
}