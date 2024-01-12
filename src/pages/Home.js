import React from 'react';
import { useEffect, useState, Text } from 'react';
import { db, CALENDARS_REF, USERS_REF } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { query, collection, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Calendar from "../components/Calendar";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function Home() {

  const [calendars, setCalendars] = useState([]);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      getCalendars();
    }
  }, [])

  if( !currentUser ) {
    return <Navigate  to="/login"/>
  }

  const getCalendars = () => {
    const q = query(collection(db, CALENDARS_REF), where('users', 'array-contains', currentUser.uid));

    onSnapshot(q, (querySnapshot) => {
      setCalendars(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  return (
    <div className="App-content">
      <Row className='calendar-list' style={{marginRight: 0}}>
      {calendars.length > 0 && calendars.map((item, i) => (
        <Col className='d-flex flex-row justify-content-center'>
        <Card key={i} onClick={() => navigate('/calendar/' + item.id)} className='calendar-card' style={{cursor: "pointer", height: window.innerWidth > 1200 ? '8vw' : '18vw'}}>
          <Card.Header>{item.name}</Card.Header>
          <Card.Body>{item.users.length} users</Card.Body>
        </Card>
        </Col>
      ))}
      <Col className='d-flex flex-row justify-content-center'>
      <Button onClick={() => navigate('/calendar/new')} variant='outline-light' className='calendar-card' style={{width: window.innerWidth > 1200 ? '12vw' : '22vw'}}>Create New Calendar</Button>
      </Col>
    </Row></div>
  );
}

export default Home;