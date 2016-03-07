import {Map, List}  from 'immutable';

export function setEntries(state, entries){
  return state.set('entries', List(entries))
}

export function next(state){
  let vote = state.get('vote');
  if (!vote) {return;}
  let [a, b] = vote.get('pair');
  let score1 = vote.getIn(['tally', a]);
  let score2 = vote.getIn(['tally', b]);
  let entries = state.get('entries');
  let winner = (score1 == score2)? [a, b] : (score1 > score2)? a:b
  return state.merge({
    vote : Map({
      pair : entries.take(2)
    }),
      entries : entries.concat(winner).skip(2)
  })
}

export function tally(state, movie){
  return state.updateIn(['vote', 'tally', movie], 0, tally => tally + 1)
}
