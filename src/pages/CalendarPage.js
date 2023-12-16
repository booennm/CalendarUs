import React from 'react';
import Calendar from '../components/Calendar'
import Users from '../components/Users'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { CALENDARS_REF, USERS_REF, db } from '../firebase';
import { query, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import CreateEvent from '../components/CreateEvent';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CalendarPage() {
  const {id} = useParams();
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    getUserIds();
  }, [])

  useEffect(() => {
    if(userIds.length > 0) {
      getUsers();
    }
  }, [userIds])

  const getUserIds = async () => {
    const calendarRef = doc(db, CALENDARS_REF, id);

    try {
        const docSnap = await getDoc(calendarRef);

        if(docSnap.exists()) {
            setUserIds(docSnap.data().users);
        }else {
            console.log('Cannot get users, calendar document does not exist');
        }
    } catch (error) {
        console.error('Error getting userIds', error.message);
    }
  }

  const getUsers = async () => {
    try {
        const userPromises = userIds.map(async (userId) => {
            const userRef = doc(db, USERS_REF, userId);
            const docSnap = await getDoc(userRef);
            if(docSnap.exists()) {
                const userData = { id: docSnap.id, ...docSnap.data() };

                //get users events collection
                const eventsQuery = query(collection(db, USERS_REF, userId, 'events'));
                const eventsSnap = await getDocs(eventsQuery);
                const eventsData = eventsSnap.docs.map((doc) => ({
                  id: doc.id,
                  start: doc.data().start.toDate(),
                  end: doc.data().end.toDate(),
                }));
                userData.events = eventsData;

                return userData;
            }else {
                console.log('User document does not exist');
                return null;
            }
        });
        const data = await Promise.all(userPromises);
        setUsers(data.filter((item) => item !== null)); //don't set unfound users
    } catch (error) {
        console.error('Error getting user', error.message);
    }
  }

  return (
    <div className="App-content">
      <Container>
        <Row>
          <Col>
            <Calendar userData={users}/>
          </Col>
        </Row>
        <Row>
          <Button onClick={() => setOpenCreateModal(true)} className="w-100" type="submit">Create Event</Button>
        </Row>
        <Row className='mx-auto, mt-5'>
          <Col>
            <Users userData={users}/>
          </Col>
        </Row>
      </Container>
      <CreateEvent
        show={openCreateModal}
        onHide={() => setOpenCreateModal(false)}
      />
    </div>
  )
}

export default CalendarPage