import { Component, OnInit } from '@angular/core';
import { IAppState } from './state/app.state';
import { Store, select } from '@ngrx/store';
import { GetUsers, GetUser } from './actions/users.action';
import { selectUserList, selectSelectedUser } from './selectors/user.selectors';
import { IUser } from './models/config.contract';

@Component({
	selector: 'ngrxstore',
	templateUrl: './ngrxstore.component.html'
})
export class NgrxstoreComponent implements OnInit {
	users = this.store.pipe(select(selectUserList));
	user : IUser;

	constructor(private store: Store<IAppState>) { }

	ngOnInit() {
		this.store.dispatch(new GetUsers());
	}

	getUser(id) {
		this.store.dispatch(new GetUser(id));
		this.store.pipe(select(selectSelectedUser)).subscribe(x => {
			this.user = x;
		});
	}
}
