import React from 'react';
import Logo from '../Assets/images/Logo.png';
import { Link } from 'react-router-dom';
import '../css/index.css';

const Home = () => {
  const Header = () => {
    return (
      <header className="header">
        <img src={Logo} alt="Logo de la aplicación" />
        <nav>
          <ul>
            <li><Link to="/Games">Juegos</Link></li>
            <li><Link to="/Login">Iniciar sesión</Link></li>
            <li><Link to="/Register">Registrarse</Link></li>
          </ul>
        </nav>
      </header>
    );
  };

  return (
    <div>
      <Header />
      <h1>Bienvenido a tu tienda de juegos favorita</h1>
      <p>Aca encontraras los mejores juegos entre las categorias de rompecabezas, acción y deportes.</p>
    </div>
  );
};

export default Home;