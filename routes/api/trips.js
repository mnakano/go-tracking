const axios = require('axios');

const roolURL = 'http://api.openmetrolinx.com/OpenDataAPI/api/V1/';
const serviceAtAGlance = 'ServiceataGlance/Trains/All';
const serviceAtAGlanceUPX = 'ServiceataGlance/UPX/All';

const lineColors = {
    LW: '#990000',
    LE: '#ff3232',
    BR: '#000099',
    MI: '#e69138',
    KI: '#4b9f27',
    ST: '#85521d',
    RH: '#539ed6',
    UPX: '#937b35',
    default: '#cccccc'
}

const getCurrentTrips = async (req, res) => {
    let trips = [];
    try{
        const resTrains = await axios.get(`${roolURL}${serviceAtAGlance}?key=${process.env.METROLINX_KEY}`);
        // const resUPX = await axios.get(`${roolURL}${serviceAtAGlanceUPX}?key=${process.env.METROLINX_KEY}`); Not working
        trips = resTrains.data.Trips.Trip;
        // trips = trips.concat(resUPX.data.Trips.Trip);
        trips = trips.map(trip => ({
            ...trip,
            color: lineColors[trip.LineCode] ? lineColors[trip.LineCode] : lineColors.default
        }));
    }catch(err){
        console.log(err);
        res.status(500);
    }finally{
        res.send(trips);
    }
}

module.exports = {
    getCurrentTrips
}