require('dotenv').config();
const axios = require('axios');

const roolURL = 'http://api.openmetrolinx.com/OpenDataAPI/api/V1/';
const serviceAtAGlance = 'ServiceataGlance/Trains/All';

(async() => {
    const res = await axios.get(`${roolURL}${serviceAtAGlance}?key=${process.env.KEY}`)
    const trips = res.data.Trips.Trip;
    console.log(trips.length);
})();