const websocket = require('../routes/websocket');
const Boss = require('../models/Boss');

module.exports = (async function() {
  const gameSessions = (await Boss.find({}).sort('delay'));
  let oldBossIndex = 0; // Holds the cutoff point for old bosses

  return {
    getBoss: () => {
      if(gameSessions.length < 0) console.error("Underflow");
      let boss = gameSessions[oldBossIndex]; //Hacky
      oldBossIndex += 1;
      websocket.subscribeToChannel(boss.name);
      return boss;
    },
    addBoss: (boss) => {
      if(gameSessions.length <= 0) gameSessions = [boss];
      else {
        let i = 0;
        while(game.delay > gameSessions[i]) i++
        gameSessions = gameSessions.slice(0,i).concat([game, ...gameSessions.slice(i)]);
      }
      return gameSessions;
    },
    ns: () => gameSessions.map(boss => boss.name),
    oldBosses: () => {
      return gameSessions.slice(0,oldBossIndex)
    },
  }
})();