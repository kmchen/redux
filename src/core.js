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
  let newEntries = entries.concat(winner)
  if (newEntries.size == 1) { 
    return state.remove('vote')
                .remove('entries')
                .set('winner', newEntries.get(0))
  }
  return state.merge({
    vote : Map({
      pair : entries.take(2)
    }),
      entries : newEntries.skip(2)
  })
}

export function tally(state, movie){
  console.log('---------------', state)
  return state.updateIn(['tally', movie], 0, tally => tally + 1)
}

export const INITIAL_STATE = Map();
