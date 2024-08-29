import React, { useState } from 'react';
import Logo from '../Assets/images/Logo.png';
import { Link } from 'react-router-dom';
import '../css/Login&Register.css';

const Register = () => {
  const Header = () => {
    return (
      <header className="header">
        <img src={Logo} alt="Logo de la aplicación" />
        <nav>
          <ul>
            <li><Link to="/">Volver</Link></li>
            <li><Link to="/Games">Juegos</Link></li>
            <li><Link to="/Login">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password,
      role: 'usuario' 
    };
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        setSuccess('User registered successfully!');
        // Aquí puedes redirigir al usuario a la página de inicio de sesión, por ejemplo.
      } else {
        setError('Failed to register user');
      }
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <div>
      <Header />
      <div className='register'>
        <b>Registrarse</b>
        <p>Ingrese sus datos</p>
        <form onSubmit={handleRegister}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}
          <button type="submit">Registrarse</button>
          <p>Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;