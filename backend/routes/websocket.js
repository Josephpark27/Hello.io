const game = require('../controllers/game');
const gameSession = require('../controllers/gameSessions');
const User = require('../models/User');

const MIN_PLAYERS = 3;
// We import io_instance so we can have multiple channels each for a different boss
module.exports = (function() {
  let io, time, playerSockets = {}, nameSpaces = {}, timer;

  /**
   * PHASE 1
   * @param {username, question, answer} data
   * @param {string} channel
  */
  function handleJoin(data, channel, socket) {
    if(game.getState().hasStarted) return console.log("Tried to start a running game");

    let nsp = nameSpaces[channel];
    game.addClient(data); // {username, question, answer}

    // Listens on a private user room
    nsp.emit('join', nsp.name + " has: " + Object.keys(game.getState().clients).length + "/" + MIN_PLAYERS + "players");
    playerSockets[data.username] = socket;

    // Check if it's time to start the game
    if(Object.keys(game.getState().clients).length >= MIN_PLAYERS) {
      nsp.emit('join', {message: "Game begins!"});  // Announces start
      startGame(nsp);
    }
    console.log(game.getState()); //DEBUG
  }

  /**
   * PHASE 2
   * @param {Socket} nsp
   */
  function startGame(nsp) {
    game.start();
    
    let names = Object.keys(playerSockets); // Generate game pairs
    names.forEach(name => {
      let socket = playerSockets[name];
      let question = game.getState().questions[name][0];
      console.log("Sending to ", name, " the question: ", question);
      socket.emit('join',{ question });
    })
    time = Date.now();
    console.log("Timer starting"); //DEBUG

    // Begin countdown until game over
    timer = setTimeout(function timeLoop() {
      console.log("Time left: ", Date.now()-time);
      console.log(Date.now());
      console.log(time);
      if(Date.now() - time > 60000) {
        clearTimeout(timer);
        nsp.emit('answer', {message: "Game ending"});
        endGame();
      } else {
        timer = setTimeout(timeLoop, 1000);
      }
    }, 1000);
  }

  /**
   * PHASE 3
   * @param {username, targetuser, answer} data 
   * @param {string} channel 
   */
  function handleAnswer(data) {
    try {
      let socket = playerSockets[data.username];
      // Check result of answer
      let result = game.submit(data.username, data.answer);
      socket.emit('answer', {result});
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * PHASE 4
   * @param {Socket} socket 
   */
  async function endGame() {
    try {
      let results = game.end();

      Object.keys(results).forEach(async name => {
        let userDoc = await User.findOne({username: name}),
            socket = playerSockets[name];
        if(userDoc){
          let rank =  userDoc.rank + results[name];
          userDoc.rank = rank;
          userDoc.save();
          socket.emit('answer', {rank});
        }
      });
    } catch(err) {
      console.error(err);
    }

  }

  return {
    mainChannel: (io_instance) => {
        io = io_instance;
    },
    subscribeToChannel: channel => {
      const nsp = io.of('/'+channel).on('connection', socket => {
        nameSpaces[channel] = nsp;
        // Joining the party and introducing therselves
        socket.on('join', data => handleJoin(data, channel, socket));
        // Handle when a user submits an answer
        socket.on('answer', data => handleAnswer(data, channel))
      });
    }
  }
})();

