import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import CreateCalendar from './pages/CreateCalendar';
import Signup from './pages/Signup';

function App() {
  const isLoggedIn = false;
  
  return (
    <>
      <div className='App'>
        <Header/>
      </div>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/signup" />}/>
        <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <Signup />}/>
        <Route path='/calendar/new' element={<CreateCalendar/>}/>
        <Route path='/calendar/:id' element={<CalendarPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;
