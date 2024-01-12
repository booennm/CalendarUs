import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function Header({userData}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        setError("Failed to log out")
        console.log(error);
      }
    }

    return (
      <Navbar className='w-100 headerbar' style={{padding: 0, height: '65px'}}>
        <Container fluid>
          <Row className='w-100 justify-content-between align-items-center'>
            <Col>
              <Navbar.Brand href="/" style={{marginLeft: '20px'}}><i className="bi-calendar3"></i></Navbar.Brand>
            </Col>
            <Col className="flex-grow-1">
            <Nav className="d-flex w-100 ml-auto justify-content-center" variant="tabs" defaultActiveKey="/" style={{paddingTop: '20px'}}> 
              <Nav.Link href="/" active={location.pathname === '/'}>Home</Nav.Link>
              <Nav.Link href="/about" active={location.pathname === '/about'}>About</Nav.Link>
              <Nav.Link href="/profile" active={location.pathname === '/profile'}>Profile</Nav.Link>
            </Nav>
            </Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {userData &&
              <Navbar.Text style={{marginRight: '20px'}}>{userData.name}</Navbar.Text>
              }
              <Button variant="outline-secondary" onClick={handleLogout}><span className='text-nowrap'>Log Out</span></Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
  
  export default Header;