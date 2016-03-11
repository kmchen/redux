import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  // Broadcast JSON-serialzed snapshot of the state to all active
  // Socket.io connection
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  })
}
