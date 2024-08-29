import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/images/Logo.png';

const UserHeader = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo de la aplicación" />
      <nav>
        <ul>
          <li><Link to="/Games">Juegos</Link></li>
          <li><Link to="/Logout">Cerrar sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const User = () => {
  return (
    <div>
      <UserHeader />
      <h1>Bienvenido usuario</h1>
    </div>
  );
};

export default User;