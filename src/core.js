import {Map, List}  from 'immutable';

export function setEntries(state, entries){
  return state.set('entries', List(entries))
}

export function next(state){
  let entries = state.get('entries')
  return state.merge({
    'vote': Map({pair: entries.take(2)}),
    'entries': entries.skip(2),
  })
}

export function tally(state, movie){
  return state.updateIn(['vote', 'tally', movie], 0, tally => tally + 1)
}
