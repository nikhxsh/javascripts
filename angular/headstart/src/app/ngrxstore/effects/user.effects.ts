import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { UserService } from 'src/app/services/user.service';
import { GetUsers, UsersActions, GetUser, GetUsersResponse, GetUserResponse } from '../actions/users.action';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { selectUserList } from '../selectors/user.selectors';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
	constructor(
		private userService: UserService,
		private action$: Actions,
		private store: Store<IAppState>
	) { }

	/**
	 * Using the Actions provided by ngrx/effects we are going to start piping our operator's for this effect.
	 * in the last operator, the Effect is going to dispatch another action
	 */
	@Effect()
	getUsers$ = this.action$.pipe(
		ofType<GetUsers>(UsersActions.GetUsers),
		switchMap(() => this.userService.getUsers()),
		switchMap(users => of(new GetUsersResponse(users)))
	)

	@Effect()
	getUser$ = this.action$.pipe(
		ofType<GetUser>(UsersActions.GetUser),
		map(action => action.payload),
		withLatestFrom(this.store.pipe(select(selectUserList))),		
		switchMap(([id, users]) => {
			const selectedUser = users.filter(user => user.id === +id)[0];
			return of(new GetUserResponse(selectedUser));
		})
	)
}