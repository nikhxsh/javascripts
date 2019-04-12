// require('./login.js');
import './css/app.scss';
import { print, loaderTest } from './js/util';

print('Common : Home');
loaderTest();

function component() {
	let element = document.createElement('div');
	element.innerHTML = 'This is webpack!!';
	return element;
}

document.body.appendChild(component());