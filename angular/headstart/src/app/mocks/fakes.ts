import { SearchItem } from "../itunes/searchitem";
import { Joke } from '../joke/Joke';

let fakeSearchitems = [
	new SearchItem('123', 'Track 1', 'a', 'b', 'c', 'd', 'e', 'f', 'In'),
	new SearchItem('124', 'Track 2', 'a', 'b', 'c', 'd', 'e', 'f', 'In'),
	new SearchItem('125', 'Track 3', 'a', 'b', 'c', 'd', 'e', 'f', 'In'),
];

let fakeJoke = new Joke('Setup', 'Punchline');

export { fakeSearchitems , fakeJoke }