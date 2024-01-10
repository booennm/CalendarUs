import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Row, Col, Container } from "react-bootstrap";
import '../App.css';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { db, USERS_REF } from "../firebase";

const Profile = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, [])

  const getEvents = () => {
    const q = query(collection(db, USERS_REF + currentUser.uid + "/events"));

    onSnapshot(q, (querySnapshot) => {
      setEvents(querySnapshot.docs.map(doc => ({
        id: doc.id,
        //title: doc.data().title,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        backgroundColor: '#ff4848',
        borderColor: '#ff4848',
        display: 'block'
      })));
    });
  }

  const handleSelect = (info) => {
    const newEvent = {
        start: info.start,
        end: info.end,
        userId: currentUser.uid
    }

    addEventToDb(newEvent);
  }

  const addEventToDb = async (event) => {
      try {
          const eventsRef = collection(db, USERS_REF + currentUser.uid + "/events");
          await addDoc(eventsRef, event);
      } catch (error) {
          console.log('Error adding document: ', error);
      }
  }

  const removeEventFromDb = async (info) => {
    try {
        const oldEventRef = doc(db, USERS_REF + currentUser.uid + "/events", info.event.id)
        await deleteDoc(oldEventRef);
    } catch (error) {
        console.log('Error removing document: ', error);
    }
  }

  return (
    <div className="App-content profile-content">
      <Container>
        <Row><Col>
          <h2>Profile</h2>
          <p>Set dates when you are not available in this personal calendar</p>
        </Col></Row>
        <Row className='mt-4'>
          <Col>
            <FullCalendar
            selectable
            select={handleSelect}
            eventClick={removeEventFromDb}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin ]}
            initialView="dayGridMonth"
            slotDuration= '01:00:00'
            displayEventTime={false}
            scrollTime={false}
            height={'auto'}
            dayMaxEvents={1}
            themeSystem='bootstrap5'
            events={events}
        />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile