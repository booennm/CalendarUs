import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import CreateCalendar from './pages/CreateCalendar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  
  return (
    <>
      <div className='App'>
        <Header/>
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
