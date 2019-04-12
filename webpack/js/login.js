import { print } from './util';

print('Common : Login');

let login = (username, password) => {
	if (username === 'admin' || password === '123')
		console.log('Login successful!!!');
	else
		console.log('Incorrect login');
};

login('admin', '123');