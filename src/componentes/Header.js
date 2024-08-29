import React from 'react';
import Logo from '../Assets/images/Logo.png';
import { Link} from 'react-router-dom';
import '../css/index.css';

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo de la aplicación" />
      <nav>
        <ul>
            <li><Link to="/">Principio</Link></li>
            <li><Link to="/Login">Iniciar sesión</Link></li>
            <li><Link to="/Register">Registrarse</Link></li>
            <li><Link to="/Games">Juegos</Link></li>
            <li><Link to="/Logout">Cerrar sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;