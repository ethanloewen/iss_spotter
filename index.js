const { fetchMyIp, fetchCoordsByIp } = require('./iss');

// fetchMyIp((error, ip) => {

//   if (error) {
//     console.log("It didn't work! - ", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIp('64.180.139.245', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });