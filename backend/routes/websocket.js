const game = require('../controllers/game');
const gameSession = require('../controllers/gameSessions');
const User = require('../models/User');

// We import io_instance so we can have multiple channels each for a different boss
module.exports = (function() {
  let io, time;

  // Data = {username, question, answer}
  function handleJoin(data, socket) {
    game.addClient(data); // {username, question, answer}

    // Listens on a private user room
    socket.join(data.username);

    // Check if it's time to start the game
    if(game.getState.clients.length >= 4) {
      let names = game.start();                         // Creates pairs
      socket.emit({message: "Game begins!"});  // Announces start
      names.forEach(name => { 
        socket.to(name).emit({
          question: game.getState().questions[name][0]  // gives questions
        });
      })
      time = Date.now();
    }
  }

  // Data = {username, targetuser, answer}
  async function handleAnswer(data, socket) {
    let submit = game.submit(data);
    socket.emit.to(data.username).emit('answer', {result: submit});
    
    // After 60 seconds game over
    if(Date.now() - time > 60000) {
      let results = game.end();
      results.forEach(async client => {
        let userDoc = await User.findOne({username: client});
        let rank = client.rank;
        userDoc.rank = rank + 1;
        userDoc.save();
        socket.to(data.username).emit('finish', {rank: rank + 1});
      })
    }
  }

  return {
    mainChannel: (io_instance) => {
        io = io_instance;
    },
    subscribeToChannel: (channel) => {
      const nsp = io.of('/'+channel);
      nsp.on('connection', function(socket) {
        console.log("Someone has connected to: ", channel);
        
        // Joining the party and introducing therselves
        socket.on('join', (data, socket) => handleJoin(data, socket));

        // Handle when a user submits an answer
        socket.on('answer', (data, socket) => handleAnswer(data, socket))
      });
    }
  }
})();

