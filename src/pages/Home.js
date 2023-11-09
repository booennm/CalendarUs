import { useEffect, useState, Text } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import Calendar from "../components/Calendar";
import { Link } from 'react-router-dom';

function Home() {

  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    getCalendars();
  }, [])


  const getCalendars = () => {
    const q = query(collection(db, CALENDARS_REF));

    onSnapshot(q, (querySnapshot) => {
      setCalendars(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  return (
    <div className="App-header">
      {calendars.length > 0 && calendars.map((item, i) => (
        <Link to={'/calendar/' + item.id}>{item.name}</Link>
      ))}
      <Link to={'/calendar/new'}>Create New Calendar</Link>
    </div>
  );
}

export default Home;