const firebase = require('./config');
const CronJob = require('cron').CronJob;

const { Board, Proximity } = require("johnny-five");

let result = null;

function addNewData () {
  const board = new Board();

  board.on("ready", () => {
    const proximity = new Proximity({
      controller: "HC-SR04",
      pin: 13
    });

    proximity.on("data", () => {
      const { centimeters } = proximity;
      result = centimeters;
    });
  });
}

let job = new CronJob('*/1 * * * * *', function() {
  if (result) {
    console.log("Proximity: ");
    console.log("  cm  : ", result);
    firebase.database().ref('/Location/29').update({
      waterLevel: result
    });
  }
}, null, true, 'Asia/Jakarta');
addNewData();
job.start();