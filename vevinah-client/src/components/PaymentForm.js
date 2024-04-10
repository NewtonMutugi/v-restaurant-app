import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const backend_url = 'http://127.0.0.1:5000';

const MpesaPaymentPage = () => {
  const { state } = useLocation(); // Get order details from props
  const order = state;
  // console.log('state: ' + JSON.stringify(order));

  const initialFormData = {
    phone: '',
    amount: parseFloat(state.amount.grandTotal),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(JSON.stringify(formData));
  };

  // const handleContinueClick= ()=>{
  //   navigate("/mpesa_payment", { replace: false, state: order });
  // }
  const submitForm = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    setLoading(true);

    fetch(backend_url + '/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setLoading(false);

        if (response.ok) {
          window.alert('Payment made');
          setFormData(initialFormData);
        } else {
          window.alert('Payment processing');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error: ', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="mpesa-dialogue">
        <div className="form-dialogue">
          <form onSubmit={submitForm}>
            <h1 className="card-header">Mpesa Payment</h1>
            <div className="form-itemP">
              <label htmlFor="phone">Phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-item">
              <br />
              <label htmlFor="amount">
                Total Amount: Ksh. {order.amount.grandTotal}
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                style={{ display: 'none', visibility: 'hidden' }} // Do not show this input field
              />
            </div>

            <div className="mpesa-buttons">
              <button
                type="submit"
                className="continue-shopping"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit'}
              </button>
              <Link to="/tracking">
                <button className="continue-shopping">Continue</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MpesaPaymentPage;
