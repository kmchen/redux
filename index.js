import makeStore    from './src/store';
import {startServer}  from './src/server';

export const store = makeStore();

// Connect Redux store to the Socket.io server
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

store.dispatch({type: 'NEXT'});
