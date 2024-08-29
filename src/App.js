import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home';
import Footer from './componentes/Footer';
import Login from './componentes/login';
import Register from './componentes/register';
import Admin from './componentes/admin';
import User from './componentes/user';
import Logout from './componentes/logout';
import GamesList from './componentes/games';
import Cart from './componentes/cart';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/User" element={<User />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Games" element={<GamesList />} />
          <Route path="/Cart" element={<Cart userId={User.userId} />} />
          </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;