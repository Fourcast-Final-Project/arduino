const axios = require('axios');
const CronJob = require('cron').CronJob;

const baseUrl = 'http://localhost:3000';

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

function algorithmLogic(currentWaterLevel) {
  const max = currentWaterLevel + 2;
  const min = currentWaterLevel - 2;
  return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100;
}

async function generate() {
  try {
    const allLocations = await getAllLocations();
    await updateAllLocations(allLocations);
  } catch (err) {
    console.log(err);
  }
}

var job = new CronJob('*/1 * * * * *', function() {
  generate();
}, null, true, 'Asia/Jakarta');
job.start();