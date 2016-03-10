import {setEntries, next, tally, INITIAL_STATE} from './core'

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES' :
      return setEntries(state, action.entries)
    case 'TALLY' :
      //return tally(state, action.tally)
      return state.update('vote', vote => tally(vote, action.tally))
    case 'NEXT' :
      return next(state)
  }
  return state;
}
