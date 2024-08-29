import React, { useState, useEffect } from "react";
import Logo from "../Assets/images/Logo.png";
import { Link } from "react-router-dom";
import "../css/games.css";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

const GameCard = ({ game, isLoggedIn, updateGame }) => {
  const [showModal, setShowModal] = useState(false);
  const [licensesToBuy, setLicensesToBuy] = useState(1);
  
  const handleBuy = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    } else {
      setShowModal(true);
    }
  };

  const handlePurchase = async () => {
    const userId = localStorage.getItem("userId");
    const gameId = game.id;
    const licensesPurchased = licensesToBuy;
    const totalPrice = parseFloat(game.price * licensesToBuy).toFixed(2);
  
    try {
      const response = await fetch(`http://localhost:5000/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, gameId, licensesPurchased, totalPrice }),
      });
      const data = await response.json();
      console.log(data);
  
      // Update licensesAvailable and licensesSold
      const updateGameResponse = await fetch(
        `http://localhost:5000/games/${gameId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            licensesAvailable: game.licensesAvailable - licensesPurchased,
            licensesSold: parseInt(game.licensesSold, 10) + licensesPurchased,
          }),
        }
      );
      const updateGameData = await updateGameResponse.json();
      console.log(updateGameData);
  
      // Update the game in the React state
      updateGame(updateGameData);
  
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    const gameId = game.id;
    const licensesToAdd = licensesToBuy;
    const totalPrice = parseFloat(game.price * licensesToBuy).toFixed(2);
  
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, gameId, licensesToAdd, totalPrice }),
      });
      const data = await response.json();
      console.log(data);
  
      // Update licensesAvailable and licensesSold
      const updateGameResponse = await fetch(
        `http://localhost:5000/games/${gameId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            licensesAvailable: game.licensesAvailable - licensesToAdd,
            licensesSold: (parseInt(game.licensesSold) || 0) + licensesToAdd,
          }),
        }
      );
      const updateGameData = await updateGameResponse.json();
      console.log(updateGameData);
  
      // Update the game in the React state
      updateGame(updateGameData);
  
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} />
      <h2>{game.name}</h2>
      <p>Categoría: {game.category}</p>
      <p>Descripción: {game.description}</p>
      <p>Tamaño: {game.size} MB</p>
      <p>Precio: ${game.price}</p>
      <p>Licencias disponibles: {game.licensesAvailable}</p>
      <p>Licencias vendidas: {game.licensesSold}</p>
      <div className="actions">
        <button className="buy-button" onClick={handleBuy}>
          Comprar
        </button>
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <img src={game.image} alt={game.name} />
          <h2>{game.name}</h2>
          <p>Descripción: {game.description}</p>
          <p>Precio: ${game.price}</p>
          <p>Licencias disponibles: {game.licensesAvailable}</p>
          <p>Licencias vendidas: {game.licensesSold}</p>
          <select
            value={licensesToBuy}
            onChange={(e) => setLicensesToBuy(e.target.value)}
          >
            {Array.from(Array(game.licensesAvailable).keys()).map((i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>&nbsp;
          <p>Total a pagar: ${parseFloat(game.price * licensesToBuy).toFixed(2)}</p>
          <button onClick={handlePurchase}>Comprar</button>&nbsp;
          <button onClick={handleAddToCart}>Agregar al carrito</button>&nbsp;
        </Modal>
        )}
      </div>
    </div>
  );
};

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/games");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("token", "some_token");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const updateGame = (updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <div className="games-list">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isLoggedIn={isLoggedIn}
            updateGame={updateGame}
          />
        ))}
      </div>
    </div>
  );
};

const Header = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo de la aplicación" />
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/User">Volver</Link>
              </li>
              <li>
                <Link to="/cart">Carrito</Link>
              </li>
              <li>
                <Link to="/logout" onClick={onLogout}>
                  Cerrar sesión
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Volver</Link>
              </li>
              <li>
                <Link to="/Login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/Register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default GamesList;
