import React, { useState, useEffect } from 'react';
import Logo from '../Assets/images/Logo.png';
import { Link } from 'react-router-dom';

// Extracted Header component into its own function
function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Logo de la aplicación" />
      <nav>
        <ul>
          <li><Link to="/Games">Volver</Link></li>
          <li><Link to="/Logout">Cerrar sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
}

function Cart({ userId }) {
  console.log('Received userId:', userId);
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    fetch(`http://localhost:5000/cart`)
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        const user = data.user.find(user => user.id === userId);
        if (user) {
          console.log('Found user:', user);
          const cart = data.cart.find(cart => cart.userId === userId);
          if (cart) {
            console.log('Found cart:', cart);
            setCarts([cart]);
          } else {
            console.log('No cart found for user');
            setCarts([]);
          }
        } else {
          console.error(`User not found: ${userId}`);
          setError(`User not found: ${userId}`); // Set error state
        }
      })
      .catch(error => {
        console.error('Error fetching db.json:', error);
        setError(`Error fetching db.json: ${error.message}`); // Set error state
      });
  }, [userId]);

  return (
    <div>
      <Header />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="card">
          <h2>Carts</h2>
          <ul id="carts-list">
            {carts.map(cart => (
              <li key={cart.id}>
                Game: {cart.gameId} - Licenses to add: {cart.licensesToAdd} - Total Price: {cart.totalPrice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cart;