import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
	let pipe: DefaultPipe;

	beforeEach(() => {
		pipe = new DefaultPipe();
	});

	it('Should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('Should return a value', () => {
		expect(pipe.transform('http://place-hold.it/300', 'fallback')).toBe('http://place-hold.it/300');
	});

	it('Should return fallback value', () => {
		expect(pipe.transform('', 'http://place-hold.it/300')).toBe('http://place-hold.it/300')
	});

	it('Should return https on asking for https', () => {
		expect(pipe.transform('', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/300');
	});
});
