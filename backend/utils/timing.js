
const gameSessions = require('../controllers/gameSessions');
const { subscribeToChannel } = require('../routes/websocket');
let time = Date.now(), currentBoss;

(async function startGame() {
  try {
    // TODO: make it so that bosses are put into a priority LL, when they expire they leave
    // TODO: fix this hacky await shit.
    currentBoss = (await gameSessions).getBoss();
    time += currentBoss.delay;
    websocket.subscribeToChannel(currentBoss.name);
    console.log("Active Boss: ", currentBoss.name, Date.now() - time);
  
    let timer = setTimeout(function bossTime() {
      // console.log("Tic: ", Date.now() - time);
      if(Date.now() < time) timer = setTimeout(bossTime, 1000);
      else {
        startGame();
        clearTimeout(timer);
      };
    }, 1000);
  } catch(err) {
    console.error(err);
  }
})();
