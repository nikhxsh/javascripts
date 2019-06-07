import { Component, OnInit } from '@angular/core';
import { IAppState } from './state/app.state';
import { Store, select } from '@ngrx/store';
import { GetAccounts, GetAccount, CreateAccount } from './actions/account.action';
import { accountsSelector, accountSelector } from './selectors/account.selectors';
import { IAccount } from './models/account.contract';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ngrxstore',
	templateUrl: './ngrxstore.component.html'
})
export class NgrxstoreComponent implements OnInit {
	accountForm: FormGroup;
	accountNumberControl: FormControl;
	openingAmountControl: FormControl;

	accounts = this.store.pipe(select(accountsSelector));
	account: IAccount;

	constructor(private store: Store<IAppState>) { }

	ngOnInit() {
		this.store.dispatch(new GetAccounts());

		this.accountNumberControl = new FormControl('', Validators.required);
		this.openingAmountControl = new FormControl('', Validators.required);

		this.accountForm = new FormGroup({
			accountNumber: this.accountNumberControl,
			openingAmount: this.openingAmountControl
		});
	}

	getAccount(id) {
		this.store.dispatch(new GetAccount(id));
		this.store.pipe(select(accountSelector)).subscribe(x => {
			this.account = x;
		});
	}

	createAccount() {
		this.store.dispatch(new CreateAccount(
			{
				accountNumber: this.accountForm.get("accountNumber").value,
				amount: this.accountForm.get("openingAmount").value
			}
		));
	}
}
