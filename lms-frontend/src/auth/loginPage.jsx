import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';
import type { AppDispatch } from './app/store';
import { userLogin } from '../redux/slice/authSlice/userLogin';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    // navigate('/dashboard');
    dispatch(userLogin());
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-banner">📚</div>
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Login to your library account</p>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
