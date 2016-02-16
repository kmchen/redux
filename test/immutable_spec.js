import {expect} from 'chai';
import {Map, List} from 'immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment (currentState) {
      return currentState+1; 
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  })

  describe('a list', () => {
    function addMovie(currentState, movie){
      return currentState.push(movie); 
    } 

    it('is immutable', () => {
      let state = List.of("movie one", "movie two")
      let nextState = addMovie(state, 'movie three');
      expect(nextState).to.equal(List.of('movie one', 'movie two', 'movie three'));
      expect(state).to.equal(List.of('movie one', 'movie two'));
    });
  });

  describe('a map', () => {
    function addMovieMap(currentState, movie){
      return currentState.update('movies', movies => movies.push(movie))
    } 

    it('is immutable', () => {
      let state = Map({'movies': List.of("movie one", "movie two")})
      let nextState = addMovieMap(state, 'movie three');
      expect(nextState).to.equal(Map({'movies': List.of('movie one', 'movie two', 'movie three')}));
      expect(state).to.equal(Map({'movies': List.of('movie one', 'movie two')}));
    });
  });
});
