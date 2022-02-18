const request = require('request-promise-native');

const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`https://api.freegeoip.app/json/${ip}?apikey=7d49bca0-9052-11ec-b011-014a3f2927ad`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const passTimes = JSON.parse(data).response;
      const formattedTimes = [];
      for (const pass of passTimes) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        formattedTimes.push(`Next pass at ${datetime} for ${duration} seconds!`);
      }
      return formattedTimes;
    });
};

module.exports = { nextISSTimesForMyLocation };