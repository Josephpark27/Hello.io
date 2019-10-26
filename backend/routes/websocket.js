
module.exports = function(socket) {
  socket.emit('test', { hello: 'world' });

  socket.on('Hello', function (user, data) {
    console.log(user);
    socket.emit('Hello', {message:"Hello" + user});
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
};