import React from 'react';
import { useEffect, useState, Text } from 'react';
import { db, CALENDARS_REF, USERS_REF } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { query, collection, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { Button } from 'react-bootstrap';
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
      {calendars.length > 0 && calendars.map((item, i) => (
        <Button key={i} onClick={() => navigate('/calendar/' + item.id)} style={{marginBottom: 10}}>{item.name}</Button>
      ))}
      <Link to={'/calendar/new'}>Create New Calendar</Link>
    </div>
  );
}

export default Home;