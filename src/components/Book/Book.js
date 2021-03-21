import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import singleImage from '../../images/Single.png';
import doubleImage from '../../images/Double.png';
import familyImage from '../../images/Family.png';
import trainImage from '../../images/Train.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Book.css';
import { Col, Row, Card, ListGroup, Figure } from 'react-bootstrap';
import Fairs from '../Fairs/Fairs';
import { CgArrowLongRightC } from 'react-icons/cg';

const Book = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { vehicleType } = useParams();
    
    const imageType = vehicleType === "Single" ? singleImage : vehicleType === "Double" ? doubleImage :
        vehicleType === "Family" ? familyImage : trainImage;

    const [journeyFrom, setJourneyFrom] = useState();
    const [destination, setDestination] = useState();
    const { register, handleSubmit, watch, errors } = useForm();
    const [searchState, setSearchState] = useState('false');
    const onSubmit = data => {
        // alert(JSON.stringify(data));
        setJourneyFrom(data.starting);
        setDestination(data.destination);

        console.log(journeyFrom, destination)
        setSearchState(!searchState);
    };
    const tickets = [1, 2, 3];
    return (

        //        <img src={imageType} alt=""/>

        <div style={{ display: 'inline-flex' }} >
            <Row>


                <Col style={{ display: searchState ? 'block' : 'none' }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="booking-form" >
                        <h6>Pick from</h6>
                        <input name="starting" ref={register({
                            required: true, maxLength: 50,
                            pattern: /^[A-Za-z]+$/i
                        })}
                        />
                        {errors.starting && "Source location required"}
                        <br />
                        <h6>Pick to</h6>
                        <input name="destination" ref={register({ pattern: /^[A-Za-z]+$/i })} />
                        {errors.destination && "Destination required"}
                        <br />
                        <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date)} />
                        <input type="submit" value="SEARCH" />
                    </form>
                </Col>


                <Col style={{ display: !searchState ? 'block' : 'none' }} >

                    <Card style={{ width: '18rem', height: 'auto' }} className="booking-form">
                        <ListGroup variant="flush" >

                            <ListGroup.Item className="from-to">
                                <Row style={{ width: 'auto', height: '8rem' }}>
                                    <Figure style={{ padding: '2rem', backgroundColor: 'whitesmoke', borderRadius: '10px' }}>
                                        <h5>{journeyFrom} <CgArrowLongRightC/> {destination}</h5>
                                    </Figure>
                                </Row>

                            </ListGroup.Item>
                        </ListGroup>
                        {

                            tickets.map(ticket =>
                                <div>

                                    <Fairs imageType={imageType} ></Fairs>
                                </div>
                            )
                        }
                    </Card>
                    {/* <img src={imageType} alt="" /> */}
                </Col>

                <Col xs={12} md={8} id="mapid">
                    <MapContainer center={[23.839, 90.404]} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[23.839, 90.404]}>
                        </Marker>
                    </MapContainer>
                </Col>
            </Row>

        </div>

    );
};

export default Book;