import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../Assets/images/Logo.png';

const Logout = () => {
  const Header = () => {
    return (
      <header className="header">
        <img src={Logo} alt="Logo de la aplicación" />
        <nav>
          <ul>
              <li><Link to="/User">Volver</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina la información de la sesión
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio
    navigate('/', { replace: true });
  };

  return (
    <div>
      <Header />
      <h2>Cerrar sesión</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Logout;