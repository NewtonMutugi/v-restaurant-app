import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel1 from '../assets/dineinphoto.jpg';

const backend_url = 'http://127.0.0.1:5000';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const image = [Carousel1];
  // const [userEmail, setUserEmail] = useState(""); // state to store user email

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const navigate = useNavigate();

  const proceedLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      fetch(`${backend_url}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      })
        .then((res) => res.json())
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
      toast.warning('Please enter your email');
    }

    if (!password || password.trim() === '') {
      result = false;
      toast.warning('Please enter your password');
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
        <img src={image} alt="menu" className="background-image" />
        <form onSubmit={proceedLogin} className="container">
          <div className="login-card">
            <div className="login-form-dialogue">
              <h1 className="card-header">Login</h1>
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
            <div className="login-footer">
              <button type="submit" className="continue-shopping">
                Login
              </button>
              or
              <Link to="/sign_up">
                <button className="continue-shopping">Sign Up</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
