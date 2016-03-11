import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  // Broadcast JSON-serialzed snapshot of the state to all active
  // Socket.io connections
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  // For every new connection
  io.on('connection', (socket) => {
    // Send current state
    socket.emit('state', store.getState().toJS());
    // Allowing clients to feed actions
    socket.on('action', store.dispatch.bind(store));
  })
}
