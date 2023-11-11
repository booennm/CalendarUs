import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        
        try {
            setErrorMessage('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            setErrorMessage('Failed to log in'); //ei toimi
            console.log(error);
        }

        setLoading(false);
        
    }

  return (
    <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh" }}
    >
        <div className='w-100' style={{ maxWidth: "400px" }}>
            <Card>
                <h2 className='text-center mb-4'>Log In</h2>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Log In</Button>
                </Form>
            </Card>
            <div className='w-100 text-center mt-2'>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    </Container>
  )
}
