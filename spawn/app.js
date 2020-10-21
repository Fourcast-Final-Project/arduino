const axios = require('axios');
const CronJob = require('cron').CronJob;

const baseUrl = 'http://localhost:3000';

let counter = 0

async function getAllLocations() {
  try {
    const allLocations = await axios({
      method: 'get',
      url: `${baseUrl}/locations`
    });
    const allLocationsRaw = JSON.parse(JSON.stringify(allLocations.data.results));
    allLocationsRaw.map(location => {
      return location.waterLevel = algorithmLogic(location.waterLevel);
    })
    return allLocationsRaw;
  } catch (err) {
    console.log(err);
  }
}

async function updateAllLocations(locations) {
  try {
    await Promise.all(locations.map(location => {
      const { waterLevel } = location
      // if(location.id === 2) {
      //   console.log(location.name, waterLevel)
      // }
      axios({
        method: 'put',
        url: `${baseUrl}/locations/${location.id}`,
        data: {
          waterLevel
        }
      });
    }));
  } catch (err) {
    console.log(err);
  }
}

function algorithmLogic(currentWaterLevel) { // logic ngaco parah kalo mulai dri 0 :") help!
  const max = currentWaterLevel + 0.001;
  const min = currentWaterLevel - 1;
  let newWaterLevel = 0
  // if (min > 0) {
    if(counter %5 === 0){
      newWaterLevel = currentWaterLevel - 20;
      if(newWaterLevel < 0){
        return 1.2 // kalo dy minus, gw bikin jadi 1.2
      } else {
        return newWaterLevel  
      }
    } else {
          if ((min < 0) && (currentWaterLevel < 2)) {
            return Math.floor(((Math.random() * max) * 100) / 100);
          } else {
            return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100;
          }
    }
 
  // let delta = ((Math.random() * 2) * 100) / 100
  // delta = Number(delta.toFixed(2))
  // // console.log(delta, '<<<<<<<<<<<<< delta')
  // let random = Math.floor(Math.random() * 10);
  // if(random %2 === 0){
  //   return currentWaterLevel - delta
  // } else {
  //   return currentWaterLevel + delta
  // }
}

// console.log(algorithmLogic(100))

async function generate() {
  // console.log(counter, '<<<<<<<<<<<< COUNTER')
  try {
    const allLocations = await getAllLocations();
    await updateAllLocations(allLocations);
  } catch (err) {
    console.log(err);
  }
}

var job = new CronJob('*/5 * * * * *', function() {
  generate();
  counter++
}, null, true, 'Asia/Jakarta');
job.start();