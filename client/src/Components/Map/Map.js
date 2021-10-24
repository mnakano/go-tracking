import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import styled from 'styled-components';
import Train from './Train';

const StyledMapContainer = styled.div`
    width: 100%;
    height: 100vh;
`;

const defaultCenter = {
    lat: 43.645530201435975,
    lng: -79.38069083670254
}

const Map = (props) => {
    const [trips, setTrips] = useState([]);

    const getData = async () => {
        const res = await axios.get('/api/trips');
        console.log(res.data);
        setTrips(res.data);
    }

    useEffect(() => {
        getData();
        const interval = setInterval(async () => {
            getData();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleApiLoaded = (map, maps) => {
        const layer = new maps.KmlLayer({
            url: 'https://raw.githubusercontent.com/mnakano/go-tracking/main/kml/test2.kml',
            map: map,
        });
    };

    return(
        <StyledMapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_KEY}}
                defaultCenter={defaultCenter}
                defaultZoom={9.5}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            {
                trips.map((trip, i) => (
                    <Train 
                        key={i}
                        lat={trip.Latitude}
                        lng={trip.Longitude}
                        color={trip.color}
                    />
                ))
            }
            </GoogleMapReact>
        </StyledMapContainer>
    );
}

export default Map;