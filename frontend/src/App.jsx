import { useState,useEffect } from 'react';
// import {NotificationContainer} from 'react-notifications';
import { Routes,Route,useNavigate } from 'react-router-dom';
import './App.css'
import Mainhome from './pages/mainHome';
import Projecthome from './pages/projectHome';
import ProjectDashboard from './pages/projectDashboard';
import Login from './pages/login';
import Signup from './pages/signUp';


function App() {
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/login')
  },[])

  return (
    <div className='main'> 
      
      <Routes>
        <Route path='/project' element={<Mainhome/>}/>
        <Route path='/project/tasks' element={<Projecthome/>}/>
        <Route path='/project/dashboard' element={<ProjectDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
      </Routes>
      {/* <NotificationContainer/> */}
      
    </div>
  )
}

export default App
