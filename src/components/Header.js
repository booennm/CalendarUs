import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function Header({userData}) {
    const { logout } = useAuth();
    const navigate = useNavigate();

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
      <Navbar className='w-100 headerbar'>
        <Container fluid>
          <Row className='w-100 justify-content-between align-items-center'>
            <Col>
              <Navbar.Brand href="/" style={{marginLeft: '20px'}}><i className="bi-calendar3"></i></Navbar.Brand>
            </Col>
            <Col className="flex-grow-1">
            <Nav className="ml-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
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