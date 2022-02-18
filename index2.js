const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((times) => {
    for (const time of times) {
      console.log(time);
    }
  })
  .catch((error) => {
    console.log('There was an error: ', error.message);
  });