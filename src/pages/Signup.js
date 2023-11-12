import React, { useRef, useState,useEffect } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db, USERS_REF } from '../firebase';
import { setDoc, collection, doc } from 'firebase/firestore';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(currentUser) {
        const newUserProfile = {
            name: nameRef.current.value
        }
        createUserProfile(currentUser.uid, newUserProfile);
        console.log(currentUser.uid + " " + newUserProfile)
        navigate('/');
      }else {
        console.log("currentuser is null")
      }
    }, [currentUser])
    

    const handleSubmit = async (e) =>  {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError('Failed to create an account');
            console.log(error);
        }

        setLoading(false);
    }

    const createUserProfile = async (id, profile) => {
        const docRef = doc(collection(db, USERS_REF), id);

        try {
            await setDoc(docRef, profile);
        } catch (error) {
            console.error('Error creating user profile', error.message);
        }
    }

  return (
    <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh" }}
    >
        <div className='w-100' style={{ maxWidth: "400px" }}>
            <Card>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
                </Form>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </div>
    </Container>
  )
}
