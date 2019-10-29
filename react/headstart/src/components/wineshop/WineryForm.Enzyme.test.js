import React from 'react';
import WineryForm from './WineryForm';
/**
 * 1. Shallow => mounts single component (No dom is created)
 * 2. mount => mounts component with children
 */
import { shallow } from 'enzyme';

function renderCourseForm(params) {
	const defaultProps = {
		countries: [],
		winery: {},
		handleChange: () => { },
		handleSave: () => { },
		formInvalid: false,
		saving: false
	};

	const props = { ...defaultProps, ...params };
	return shallow(<WineryForm {...props} />)
}

it('renders form', () => {
	const wrapper = renderCourseForm();
	expect(wrapper.find('form').length).toBe(1);
	expect(wrapper.find('h4').text()).toEqual('Add Winery');
});


it('Submit button as "Save" when form not saving', () => {
	const wrapper = renderCourseForm();
	expect(wrapper.find('button').text()).toEqual('Save');
});

it('Submit button as "Saving..." when form saving', () => {
	const wrapper = renderCourseForm({ saving: true });
	expect(wrapper.find('button').text()).toEqual('Saving...');
});