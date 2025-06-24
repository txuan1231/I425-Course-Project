/*
Name: Thomas Xuan
Date: today's date
File: Header.js
Description: create the page header
*/

import {NavLink} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";

//This component creates a React-Bootstrap navbar. https://react-bootstrap.github.io/components/navbar/
const Header = () => {
    const className = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="sm">
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand><img src="/src/assets/zillow.png" alt="Logo"/>Zillow Housing</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className={className}>Home</NavLink>
                            <div className="nav-separator">|</div>
                            <NavLink to="/cities" className={className}>City</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;