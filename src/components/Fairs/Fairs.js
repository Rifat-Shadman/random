import React from 'react';
import { Figure, ListGroup, FigureCaption, Button, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import singleImage from '../../images/Single.png';
import doubleImage from '../../images/Double.png';
import familyImage from '../../images/Family.png';
import trainImage from '../../images/Train.png';
import personIcon from '../../images/icons/person.png';

const Fairs = (props) => {
    // console.log(props);
    const { vehicleType } = useParams();
    const imageType = vehicleType === "Single" ? singleImage : vehicleType === "Double" ? doubleImage :
        vehicleType === "Family" ? familyImage : trainImage;
    return (

        <ListGroup variant="flush" >

            <ListGroup.Item>
                <Row style={{ width: 'auto', height:'8rem' }}>
                    <Figure style={{ padding: '2rem',  backgroundColor: 'whitesmoke', borderRadius:'10px' }}>
                        <div style={{ display: 'flex' }}>
                            <Figure.Image
                                width={60}
                                height={60}
                                alt="vehicle_Image"
                                src={imageType}

                                style={{ paddingRight: '1em', marginRight: '1em' }}
                            />

                            <Figure.Image
                                width={40}
                                height={40}
                                alt="person_Icon"
                                src={personIcon}

                                
                            /> 
                            <h4 style={{ paddingRight: '1em', marginRight: '1em' }}>2</h4>

                            <h4>$47</h4>
                        </div>



                        <Figure.Caption style={{textAlign:'center'}}>
                            Premium
                    </Figure.Caption>
                    </Figure>
                </Row>

            </ListGroup.Item>
        </ListGroup>
    );
};

export default Fairs;