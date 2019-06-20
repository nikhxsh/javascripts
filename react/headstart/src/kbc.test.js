import React from 'react';
import ReactDOM from 'react-dom';
import Kbc from './Kbc';

describe('KBC', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Kbc />, div);
		ReactDOM.unmountComponentAtNode(div);
	  });
});
 