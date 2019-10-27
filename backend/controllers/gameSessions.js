
const Boss = require('../models/Boss');

module.exports = (async function() {
  const gameSessions = (await Boss.find({}).sort('delay'));

  const getNS = () => gameSessions.map(boss => boss.name);

  // getBoss Game Sessions
  const dequeue = () => {
    if(gameSessions.length < 0) console.error("Underflow");
    return gameSessions.shift();
  };

  // setBoss Game Sessions
  const enqueue = (game) => {
    if(gameSessions.length <= 0) gameSessions = [boss];
    else {
      let i = 0;
      while(game.delay > gameSessions[i]) i++
      gameSessions = gameSessions.slice(0,i).concat([game, ...gameSessions.slice(i)]);
    }
    return gameSessions;
  };

  return {
    getBoss: () => dequeue(),
    addBoss: (boss) => enqueue(),
    ns: () => getNS()
  }
})();