import {setEntries, next, tally} from './core'

export default function reducer(state, action) {
  switch(action.type) {
    case 'SET_ENTRIES' :
      return setEntries(state, action.entries)
    case 'TALLY' :
      return tally(state, action.tally)
    case 'NEXT' :
      return next(state)
  }
  return state;
}
