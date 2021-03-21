import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/Urban Riders.png';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../App';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">TourMate</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="">
                            {loggedInUser.name ? <Button variant="secondary">{loggedInUser.name}</Button>  : ''}
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="/login">
                            {loggedInUser.name ? <Button variant="secondary">Log Out</Button> : 'Login'}
                        </Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;