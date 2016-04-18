import {setEntries, next, tally, INITIAL_STATE} from './core'

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES' :
      return setEntries(state, action.entries)
    case 'VOTE' :
      let s = state.update('vote', vote => tally(vote, action.tally))
      return s
    case 'NEXT' :
      return next(state)
  }
  return state;
}
