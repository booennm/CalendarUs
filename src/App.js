import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import CreateCalendar from './pages/CreateCalendar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();
  const isLoggedIn = false;
  
  return (
    <>
      <div className='App'>
        <Header/>
      </div>
      <Routes>
        <Route path='/' exact element={currentUser ? <Home /> : <Navigate to="/signup" />}/>
        <Route path='/signup' element={currentUser ? <Navigate to="/" /> : <Signup />}/>
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
