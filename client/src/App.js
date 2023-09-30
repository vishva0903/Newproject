import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import UserSignup from './scenes/Register/Signup';
import Home from './scenes/Home/Home'
import LandingPage from './scenes/LandingPage/Landingpage';
import UserSignin from './scenes/Login/Signin';
import NavBar from './components/Navbar/Navbar';
import Snackbar from './components/Snackbar/Snackbar';
import protectedRoutes from './routeProtection/ProtectedRoutes'
import ProtectedRoute from './routeProtection/ProtectedRoute';
import publicRoutes from '../src/routes/PublicRoute';
import ForceRedirect from './routeProtection/ForcedRedirect';
import { setToken, clearToken, isConnected, setUserProfile } from './store/loginedUser'

function App() {
  const dispatch = useDispatch()
  const active = useSelector((state) => state.auth.isConnected)
  const [user, setUser] = useState([]);
  const Auth = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      let body = {
        token
      }
      axios.post('http://localhost:8000/user/auth', body)
        .then((res) => {
          const userId = res.data?._id
          axios.get(`http://localhost:8000/user/getuser/${userId}`)
            .then((res) => {
              console.log('user', res.data)
              setUser(res.data)
              dispatch(isConnected())
            })
        })
        .catch((err) => {
          console.log('err from home', err)
        })
    
    }

  }

  useEffect(() => {
    Auth()
  },[active]);


  return (
    <>

      <NavBar />
      <Snackbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<UserSignup />} />
        <Route path="/Login" element={<UserSignin />} />
      </Routes>
    </>
  );
}

export default App;
