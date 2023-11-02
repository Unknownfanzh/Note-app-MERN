import React, { useState } from 'react';

export default function Signup({ onSignupSuccess, setIsNewUser }) {
  const [signupInfo, setSignupInfo] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      if (response.ok) {
        alert('Signup successful, you can now login.');
        setIsNewUser(false);
    } else {
        const message = await response.text();
        alert(message);
    }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupInfo.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupInfo.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => setIsNewUser(false)}>Already have an account? Login</button>
    </div>
  );
}