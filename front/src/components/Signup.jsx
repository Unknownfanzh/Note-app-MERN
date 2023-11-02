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
    <div className="form-container">
      <div className="row form-div">
        <div className="col form-title">
          <h2>Sign Up</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupInfo.username}
                onChange={handleInputChange}
                required
                className="form-control"
              />
              <label className="form-label">Username</label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupInfo.password}
                onChange={handleInputChange}
                required
                className="form-control"
              />
              <label className="form-label">Password</label>
            </div>
            <div className="row mb-4">
              <div className="col">
                <button
                  onClick={() => setIsNewUser(false)}
                  className="btn btn-link"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4 form-submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
}