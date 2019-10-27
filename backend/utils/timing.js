
const Boss = require('../models/Boss');
let i = 0, time = Date.now(), currentBoss;

async function getNextBoss() {
  let bosses = await Boss.find({}).sort('delay');
  if(!bosses || i >= bosses.length) console.error("No document found");
  i++;
  return bosses[i];
}

(async function startGame() {
  try {
    currentBoss = await getNextBoss();
    time += currentBoss.delay;
    console.log("Boss: ", currentBoss.name, time);
  
    let timer = setTimeout(function bossTime() {
      console.log("Tic: ", Date.now() - time);
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
