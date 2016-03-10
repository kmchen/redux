import {fromJS, Map, List}  from 'immutable';
import {expect}             from 'chai';
import _                    from 'lodash';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initState = Map();; 
    const action = {type: 'SET_ENTRIES', entries: ['movie one']}
    const nextState = reducer(initState, action)
    expect(nextState).to.equal(fromJS({
      entries: ['movie one']
    }));
  });
  it('handles TALLY to create a tally for the voted entry', () => {
    let state = Map({ pair : List.of('movie one', 'movie two')})
    let action = {type: 'TALLY', tally : 'movie one'}
    let nextState = reducer(state, action)
    expect(nextState).to.equal(fromJS({
      pair : ['movie one', 'movie two'],
      tally : {'movie one': 1},
    }))
  });
  it('handles TALLY to add to existing tally for the vote entry', () => {
    let state = Map({ 
      pair : List.of('movie one', 'movie two'),
      tally : Map({'movie one': 1, 'movie two': 2})
    })
    let action = {type: 'TALLY', tally : 'movie one'}
    let nextState = reducer(state, action)
    expect(nextState).to.equal(fromJS({
        pair : ['movie one', 'movie two'],
        tally : {'movie one': 2, 'movie two': 2}
    }))
  })
  it('handle NEXT to take the winner back to the entries and drop the loser', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 1, 'movie two': 2})
      }),
      entries: List.of('movie three', 'movie four')
    })
    let action = {type: 'NEXT'}
    let nextState = reducer(state, action)
    expect(nextState).to.equal(fromJS({
      vote : {
        pair: ['movie three', 'movie four']
      },
      entries : ['movie two']
    }))
  });
  it('handle NEXT, tied vote puts both back to entries', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 2, 'movie two': 2})
      }),
      entries: List.of('movie three', 'movie four')
    })
    let action = {type: 'NEXT'}
    let nextState = reducer(state, action)
    expect(nextState).to.equal(fromJS({
      vote : {
        pair: ['movie three', 'movie four']
      },
      entries : ['movie one', 'movie two']
    }))
  });
  it('handle NEXT, the winner wins the vote', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 2, 'movie two': 1})
      }),
      entries: List.of()
    })
    let action = {type: 'NEXT'}
    let nextState = reducer(state, action)
    expect(nextState).to.equal(fromJS({
      winner : 'movie one'
    }))
  });
  it('handle undefined state', () => {
    const initState = Map();; 
    const action = {type: 'SET_ENTRIES', entries: ['movie one']}
    const nextState = reducer(undefined, action)
    expect(nextState).to.equal(fromJS({
      entries: ['movie one']
    }));
  });
  it('reducer composition', () => {
    let acions = [
      {type: 'SET_ENTRIES', entries: ['movie one', 'movie two']},
      {type: 'NEXT', entries: ['movie one', 'movie two']},
    ]
    const initState = Map();; 
    const action = {type: 'SET_ENTRIES', entries: ['movie one']}
    const nextState = reducer(undefined, action)
    expect(nextState).to.equal(fromJS({
      entries: ['movie one']
    }));
  });
});
