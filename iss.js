const request = require('request');

const fetchMyIp = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;
  });

};

const fetchCoordsByIp = function(ip, callback) {
  const url = `https://api.freegeoip.app/json/${ip}?apikey=7d49bca0-9052-11ec-b011-014a3f2927ad`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const parsedBody = JSON.parse(body);
    const latitude = parsedBody.latitude;
    const longitude = parsedBody.longitude;
    let coords = {
      latitude,
      longitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS information. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const parsedBody = JSON.parse(body).response;
    callback(null, parsedBody);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
  
    fetchCoordsByIp(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }

      fetchISSFlyOverTimes(data, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        const formattedTimes = [];
        for (const pass of passTimes) {
          const datetime = new Date(0);
          datetime.setUTCSeconds(pass.risetime);
          const duration = pass.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`);
        }

        callback(null, formattedTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };