import React, { createContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
import { Card, CardDeck, Col, Container, Figure, Image, Row } from 'react-bootstrap';
import { UserContext } from '../../App';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }

}));

export default function Vehicle({ vehicle }) {
  const classes = useStyles();
  const history = useHistory()
  const handleBook = (vehicleType) => {
    history.push(`/book/${vehicleType}`);
  }

  const figureStyle = {
    alignItems:'center',  
    borderRadius:'4px', 
    boxShadow:'cornsilk',
    padding:'3rem', 
    height:'60%', 
    marginTop:'3rem'
  }

  return (
    // <Card className={classes.img} style={{ height: '200px', padding: '10px' }}>
    //   <Grid row lg-4 sm-1>
    //     <CardMedia
    //       onClick={() => handleBook(room.vehicleType)}
    //       className={classes.media}
    //       image={room.imgUrl}
    //       title={room.title}
    //       style={{ width: '15rem', height: '3rem', cursor: 'pointer' }}
    //     />
    //   </Grid>
    <div > 
      {/* <CardDeck>
        <Card style={{margin: '10px', padding:'3px', border:'1px solid black'}}>

          <Card.Img variant="top" src={room.imgUrl}
            onClick={() => handleBook(room.vehicleType)}
            style={{ height: '10rem', width:'15rem', backgroundColor:'wheat', cursor:'pointer'  }}
          />

        </Card>
      </CardDeck> */}

      {/* <Col xs={6} md={4} sm={12}>
        <Image src={room.imgUrl} rounded fluid 
        onClick={() => handleBook(room.vehicleType)}
        />
      </Col> */}


      <Figure style={figureStyle}>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={vehicle.imgUrl}
          onClick={() => handleBook(vehicle.vehicleType)}
          style={{cursor:'pointer'}}
        />
        
      </Figure>
    </div>

    // <Container>
    //   <Row xs={4} sm={12}>
    //     <Col >
    //       <Image src={room.imgUrl} rounded style={{height:'150px'}} />
    //     </Col>
    //     </Row>
    // </Container>





  );
}
