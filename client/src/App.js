import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import ProfileInd from './ProfileInd';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/profileind/:fullname/:email/:skill' element={<ProfileInd />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;