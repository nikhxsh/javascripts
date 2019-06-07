import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { AccountService } from 'src/app/services/account.service';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetAccounts, GetAccount, AccountActions, GetAccountsResponse, GetAccountResponse, CreateAccount } from '../actions/account.action';
import { accountsSelector } from '../selectors/account.selectors';

@Injectable()
export class AccountEffects {
	constructor(
		private accountService: AccountService,
		private action$: Actions,
		private store: Store<IAppState>
	) { }

	/**
	 * Using the Actions provided by ngrx/effects we are going to start piping our operator's for this effect.
	 * in the last operator, the Effect is going to dispatch another action
	 */
	@Effect()
	getAccounts$ = this.action$.pipe(
		ofType<GetAccounts>(AccountActions.GetAccounts),
		switchMap(() => this.accountService.getAccounts()),
		switchMap(accounts => of(new GetAccountsResponse(accounts)))
	)

	@Effect()
	getAccount$ = this.action$.pipe(
		ofType<GetAccount>(AccountActions.GetAccount),
		map(action => action.payload),
		withLatestFrom(this.store.pipe(select(accountsSelector))),		
		switchMap(([accountNumber, accounts]) => {
			const selectedAccount = accounts.filter(account => account.accountNumber === +accountNumber)[0];
			return of(new GetAccountResponse(selectedAccount));
		})
	)

	@Effect()
	createAccount$ = this.action$.pipe(
		ofType<CreateAccount>(AccountActions.CreateAccount),
		map(action => action.payload),	
		map(account => {
			this.accountService.addAccount(account);
		})
	)
}