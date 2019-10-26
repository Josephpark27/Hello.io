
module.exports = function(socket) {
  socket.emit('test', { hello: 'world' });

  socket.on('Hello', function (user) {
    console.log("WS: on \'Hello\' channel, received: ", user);
    this.emit('Hello', {message:"Hello " + user});
  });

  socket.on('disconnect', function () {
    this.emit('user disconnected');
  });
};