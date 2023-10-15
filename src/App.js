import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='App'>
        <Header/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;
