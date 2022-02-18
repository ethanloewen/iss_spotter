const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIp((error, ip) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIp('64.180.139.245', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , data);
// });

// fetchISSFlyOverTimes(({ latitude: '49.0754', longitude: '-122.178' }), (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned ISS data:', data);
// });