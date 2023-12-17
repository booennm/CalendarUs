import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { USERS_REF, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import CreateCalendar from './pages/CreateCalendar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [userData, setUserData] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if(currentUser.uid) {
      getUserData();
    }
  }, [currentUser.uid])

  const getUserData = async () => {
    try {
            const userRef = doc(db, USERS_REF, currentUser.uid);
            const docSnap = await getDoc(userRef);
            if(docSnap.exists()) {
                setUserData(docSnap.data());
            }else {
                console.log('User document does not exist');
                return null;
            }
    } catch (error) {
        console.error('Error getting user', error.message);
    }
  }
  
  return (
    <>
      <div className='App'>
        <Header userData={userData}/>
      </div>
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/calendar/new' element={<CreateCalendar/>}/>
        <Route path='/calendar/:id' element={<CalendarPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;
