import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignInUp() {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });

  const signUpButtonStyle = {
    width: '300px',
    margin: '0 auto',
    display: 'block',
    marginTop: '40px',
    marginBottom: '20px',
    backgroundColor: '#800000', // Maroon color
    border: 'none',
  };

  const signInButtonStyle = {
    width: '300px',
    margin: '0 auto',
    display: 'block',
    marginBottom: '40px',
    backgroundColor: '#556B2F', // Olive Green color
    border: 'none',
  };

  const formstyle = {
    backgroundColor: '#ABD6DFFF',
    padding: '40px',
    borderRadius: '8px',
    margin: '200px auto',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className='text-center'>
      <Form style={formstyle}>
        <Link to='/create_account'>
          <Button style={signUpButtonStyle} variant='primary'>
            Sign Up
          </Button>
        </Link>

        <Link to='/sign_in'>
          <Button style={signInButtonStyle} variant='secondary'>
            Sign In
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default SignInUp;
