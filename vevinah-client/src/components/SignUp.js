import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel1 from '../assets/dineinphoto.jpg';

const backend_url = 'http://127.0.0.1:5000';
const Register = () => {
  const [user, setUser] = useState({});

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();
  const image = [Carousel1];

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(user));
    fetch(`${backend_url}/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Registered successfully.');
          setRegistrationSuccess(true);
          navigate('/sign_in', { replace: true });
        } else {
          toast.error('Registration failed.');
        }
      })
      .catch((err) => {
        toast.error('Failed: ' + err.message);
        console.log(err);
        alert('Invalid');
      });
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <img src={image} alt="menu" className="background-image" />
      <div className="card">
        <div className="signup-form-dialogue">
          <h1 className="card-header">Sign up</h1>
          <form className="container" onSubmit={handleSubmit}>
            <div className="row">
              {['First name', 'Last name', 'Email', 'Phone', 'Password'].map(
                (field) => (
                  <div key={field} className="col-lg-6">
                    <div className="form-group">
                      <label>
                        {field}
                        <span className="errmsg">*</span>
                      </label>
                      <input
                        type={field === 'Password' ? 'password' : 'text'}
                        value={
                          user[
                            field === 'First name'
                              ? 'first_name'
                              : field === 'Last name'
                              ? 'last_name'
                              : field === 'Email'
                              ? 'email'
                              : field === 'Phone'
                              ? 'phone'
                              : field === 'Password'
                              ? 'password'
                              : ''
                          ]
                        }
                        onChange={handleChange}
                        name={
                          field === 'First name'
                            ? 'first_name'
                            : field === 'Last name'
                            ? 'last_name'
                            : field === 'Email'
                            ? 'email'
                            : field === 'Phone'
                            ? 'phone'
                            : field === 'Password'
                            ? 'password'
                            : ''
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="signup-footer">
              <button type="submit" className="continue-shopping">
                {registrationSuccess ? 'Registered!' : 'Signup'}
              </button>
              or
              <Link to="/sign_in">
                <button className="continue-shopping">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {registrationSuccess && (
        <div className="alert alert-success" role="alert">
          Registration successful! You can now sign in.
        </div>
      )}
    </div>
  );
};

export default Register;
