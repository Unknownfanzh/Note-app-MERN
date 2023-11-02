import React, { useState } from 'react';

export default function Login({ onLoginSuccess, setIsNewUser }) {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for including the session cookie
        body: JSON.stringify(loginInfo),
      });

      const data = await response.text();

      if (response.ok) {
        onLoginSuccess({ username: loginInfo.username });
      } else {
        alert(data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginInfo.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setIsNewUser(true)}>Don't have an account? Sign Up</button>
    </div>
  );
}