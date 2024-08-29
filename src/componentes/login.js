import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login&Register.css';
import Logo from '../Assets/images/Logo.png';

const Login = () => {
  const LoginHeader = () => {
    return (
      <header className="header">
        <img src={Logo} alt="Logo de la aplicación" />
        <nav>
          <ul>
              <li><Link to="/">Volver</Link></li>
              <li><Link to="/Register">Registrarse</Link></li>
              <li><Link to="/Games">Juegos</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        if (user.role === 'administrador') {
          window.location.href = '/Admin';
        } else if (user.role === 'usuario') {
          localStorage.setItem('token', 'some_token');
          window.location.href = '/User';
        }
        alert('Login successful!');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error fetching users');
    }
  };

  return (
    <div>
      <LoginHeader />
      <div className='login'>
        <b>Iniciar sesión</b>
        <p>Ingrese sus credenciales</p>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Iniciar sesión</button>
          <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;