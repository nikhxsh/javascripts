import { Joke } from "./Joke";

describe('Joke', () => {
  it('should create an instance', () => {
    expect(new Joke('','')).toBeTruthy();
  });
});
