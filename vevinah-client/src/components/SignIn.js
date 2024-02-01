import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel1 from '../assets/dineinphoto.jpg';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const image = [Carousel1];

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const navigate = useNavigate();

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      })
        .then((res) => res.json()) // Add this line
        .then((data) => {
          if (data.access_token) {
            toast.success('Login successfully.');
            localStorage.setItem('access_token', data.access_token);
            console.log('passed' + userCredentials);
            navigate('/payment', { replace: true });
          } else {
            toast.error('Login failed.');
            console.log(userCredentials);
          }
        })
        .catch((err) => {
          toast.error('Failed: ' + err.message);
          console.log(err);
          console.log(userCredentials);
          alert('Invalid');
        });
    }
  };

  const validate = () => {
    const { email, password } = userCredentials;
    let result = true;

    if (!email || email.trim() === '') {
      result = false;
      toast.warning('Please enter a email');
    }

    if (!password || password.trim() === '') {
      result = false;
      toast.warning('Please enter a password');
    }

    return result;
  };

  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <img src={image} alt="menu-image" className="background-image" />
        <form onSubmit={proceedLogin} className="container">
          <div className="login-card">
            <div className="login-header">
              <h1>Login</h1>
            </div>
            <div className="form-dialogue" style={{ borderRadius: '0' }}>
              <div className="form-group">
                <label>
                  Email <span className="errmsg">*</span>
                </label>
                <input
                  type="text"
                  value={userCredentials.email}
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={userCredentials.password}
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="login-footer" style={{ marginTop: '20%' }}>
              <button type="submit" className="continue-shopping">
                Login
              </button>
              <Link to="/sign_up" className="">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
