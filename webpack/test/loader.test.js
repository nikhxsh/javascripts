import compiler from './compiler';
import 'babel-polyfill';

test('Insert name and outputs Javascripts', async () => {
	const stats = await compiler('test.txt');
	const output = stats.toJson().modules[0].source;

	expect(output).toBe('export default "Hey Nik!"')
});