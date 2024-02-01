import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel1 from '../assets/dineinphoto.jpg';

const Register = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    phone: '',
  });

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

    fetch('http://localhost:5000/signup', {
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
      <div className="card">
        <img src={image} alt="menu-image" className="background-image" />
        <div className="card-header">
          <h1>Sign up</h1>
        </div>
        <div
          style={{ marginTop: '20%', borderRadius: '0' }}
          className="form-dialogue"
        >
          <form className="container" onSubmit={handleSubmit}>
            <div className="row">
              {['first_name', 'last_name', 'email', 'phone', 'password'].map(
                (field) => (
                  <div key={field} className="col-lg-6">
                    <div className="form-group">
                      <label>
                        {/* {field.charAt(0).toUpperCase() + field.slice(1)}{' '} */}
                        {field}
                        <span className="errmsg">*</span>
                      </label>
                      <input
                        type={field === 'password' ? 'password' : 'text'}
                        value={user[field]}
                        onChange={handleChange}
                        name={field}
                        className="form-control"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="form-diaolgue">
              <button type="submit" className="continue-shopping">
                {registrationSuccess ? 'Registered!' : 'Signup'}
              </button>{' '}
              <br />
              <Link to="/sign_in" className="">
                Already have an account? Sign in
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
