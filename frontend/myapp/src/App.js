import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home';



import AuthService from './services/auth.service';

function App() {




  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowAdminBoard(user.roles.includes(`ROLE_ADMIN`));
    }

  }, []);

  const logOut = () => {
    AuthService.logout();
  }




  return (

    <Router>
      {currentUser && <Header currentUser={currentUser} logOut={logOut} />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home currentUser={currentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
