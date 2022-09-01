import Cookies from 'js-cookie';
import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Navbar from '../components/Navbar';
import About from '../Pages/About';
import Detail from '../Pages/Detail';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

export default function RouterIndex() {
  const token = Cookies.get('token')

  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          {token ? (
            <>
              <Route exact path="/home" element={<Home label={'Homepage'} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/detail" element={<Detail />} />
              <Route exact path="/" element={<Login />} />
            </>
          ) : (
            <Route exact path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </Router>
  )
}
