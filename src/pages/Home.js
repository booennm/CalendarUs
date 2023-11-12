import { useEffect, useState, Text } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import Calendar from "../components/Calendar";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function Home() {

  const [calendars, setCalendars] = useState([]);

  const { currentUser } = useAuth();

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
    <div className="App-header">
      user: { currentUser.email }
      {calendars.length > 0 && calendars.map((item, i) => (
        <Link to={'/calendar/' + item.id}>{item.name}</Link>
      ))}
      <Link to={'/calendar/new'}>Create New Calendar</Link>
    </div>
  );
}

export default Home;