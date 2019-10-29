import React from 'react';
import WineryForm from './WineryForm';
import renderer from 'react-test-renderer';

import { mockWineries } from '../../Test/WineryMockData';

it("Set submit button label 'Saving..' when saving is true", () => {
	const tree = renderer.create(
		<WineryForm
			countries={[]}
			winery={mockWineries[0]}
			handleChange={jest.fn()}
			handleSave={jest.fn()}
			saving={true}
		/>
	);
	expect(tree).toMatchSnapshot();
});

it("Set submit button label 'Save' when saving is false", () => {
	const tree = renderer.create(
		<WineryForm
			countries={[]}
			winery={mockWineries[1]}
			handleChange={jest.fn()}
			handleSave={jest.fn()}
			saving={false}
		/>
	);
	expect(tree).toMatchSnapshot();
});