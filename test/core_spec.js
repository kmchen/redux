import {List, Map}  from 'immutable';
import {expect}     from 'chai';

import {setEntries, next, tally} from '../src/core';

describe('vote', () => {
  it('creates a tally for the voted entry', () => {
    let state = Map({
          pair : List.of('movie one', 'movie two'),
        })
    let vote = tally(state, 'movie one')
    expect(vote).to.equal(Map({
        pair : List.of('movie one', 'movie two'),
        tally : Map({'movie one': 1}),
    }))
  })

  it('adds to existing tally for the vote entry', () => {
    let state = Map({
          pair : List.of('movie one', 'movie two'),
          tally : Map({'movie one': 1, 'movie two': 2}),
        })
    let vote = tally(state, 'movie one')
    expect(vote).to.equal(Map({
        pair : List.of('movie one', 'movie two'),
        tally : Map({'movie one': 2, 'movie two': 2}),
    }))
  })
});

describe('application logic', () => {
  it('takes the winner back to the entries and drop the loser', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 1, 'movie two': 2})
      }),
      entries: List.of('movie three', 'movie four')
    })
    let nextState = next(state)
    expect(nextState).to.equal(Map({
      vote : Map({
        pair: List.of('movie three', 'movie four')
      }),
      entries : List.of('movie two')
    }))
  });
  it('tied vote puts both back to entries', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 2, 'movie two': 2})
      }),
      entries: List.of('movie three', 'movie four')
    })
    let nextState = next(state)
    expect(nextState).to.equal(Map({
      vote : Map({
        pair: List.of('movie three', 'movie four')
      }),
      entries : List.of('movie one', 'movie two')
    }))
  });
  it('the winner wins the vote', function(){
    let state = Map({
      vote : Map({
        pair: List.of("movie one", "movie two"),
        tally: Map({'movie one': 2, 'movie two': 1})
      }),
      entries: List.of()
    })
    let nextState = next(state)
    expect(nextState).to.equal(Map({
      winner : 'movie one'
    }))
  });
});

describe('Set entries ', function(){
  it('setEntries', function(){
    let state = Map();  
    let entries = ['movie one', 'movie two']
    var nextState = setEntries(state, entries)
    expect(nextState).to.equal(Map(
        {'entries' : List.of('movie one', 'movie two')}
        ))
  });
});
