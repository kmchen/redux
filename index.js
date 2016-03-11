import makeStore    from './src/store';
import {startServer}  from './src/server';

export const store = makeStore();

// Connect Redux store to the Socket.io server
startServer(store);
