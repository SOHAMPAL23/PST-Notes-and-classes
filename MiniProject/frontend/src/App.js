import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          {token ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={token ? <BookList token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
