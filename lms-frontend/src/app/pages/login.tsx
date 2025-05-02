import React, { use, useState } from 'react';
import "../styles/app.css"
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slice/authSlice';
import { AppDispatch } from '../redux/store/configureStore';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const handleLogin = () => {
    // navigate('/dashboard');
    dispatch(loginUser({ email, password,navigate }));
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
