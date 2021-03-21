import React from 'react';

import singleImage from '../../images/Single.png';
import doubleImage from '../../images/Double.png';
import familyImage from '../../images/Family.png';
import trainImage from '../../images/Train.png';
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
    const vehicles = [
        {
            title: 'Motorbike',
            description: 'Standard Single Rooms are designed in open -concept living area and have many facilities.',
            imgUrl: singleImage,
            id: '1',
            bed: 1,
            capacity: 1,
            bedType: 'Single',
            avatar: 'S',
            price: 119
        },
        {
            title: 'Taxi',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: doubleImage,
            id: '2',
            bed: 1,
            capacity: 2,
            bedType: 'Double',
            avatar: 'D',
            price: 149
        },
        {
            title: 'Bus',
            description: ' Have lots of in-room facilities and are designed in open-concept living area.',
            imgUrl: familyImage,
            id: '3',
            bed: 2,
            capacity: 4,
            bedType: 'Family',
            avatar: 'F',
            price: 199
        },
        {
            title: 'Train',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: trainImage,
            id: '4',
            bed: 1,
            capacity: 2,
            bedType: 'Train',
            avatar: 'D',
            price: 149
        }
    ]
    return (
        <div>
            <h1 style={{color:'black', marginTop:'5rem'}}>Select your tourmate: </h1>
            <div style={style}>
            
            {
                vehicles.map(vehicle => <Vehicle key={vehicle.bedType} vehicle={vehicle}></Vehicle>)
            }
        </div>
        </div>
        
    );
};

export default Home;