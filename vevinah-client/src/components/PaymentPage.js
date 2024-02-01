import React, { useState, useEffect } from 'react';
import mpesaLogo from './images/mpesa-logo.png';
import cashLogo from './images/cash-logo.png';
import paypalLogo from './images/paypal-logo.png';
import binanceLogo from './images/binance-logo.png';
import visaLogo from './images/visa-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/locations')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        console.log(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Fetch cart data from localStorage
  const cart = JSON.parse(localStorage.getItem('cart'));

  // Calculate total price of items in cart
  useEffect(() => {
    let newTotalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
      newTotalPrice += cart[i].price * cart[i].quantity;
    }

    setTotalPrice(newTotalPrice.toFixed(2));
  }, [cart]);

  // Get delivery fee from selected location in the select form options
  useEffect(() => {
    if (selectedLocation) {
      const selectedLocationObject = locations.find(
        (location) => location.id === parseInt(selectedLocation)
      );

      setDeliveryFee(selectedLocationObject.delivery_fee);
    }
  }, [selectedLocation, locations]);

  // Calculate grand total
  useEffect(() => {
    setGrandTotal(
      (parseFloat(totalPrice) + parseFloat(deliveryFee)).toFixed(2)
    );
  }, [totalPrice, deliveryFee]);

  // Get selected location from cityId

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPayment === 'mpesa') {
      //setRedirect('/mpesa_payment');
      alert('Please make payment to Mpesa Till Number 707070.');
    } else if (selectedPayment === 'cash') {
      alert('Please make payment upon delivery.');
    } else if (selectedPayment === 'paypal') {
      window.location.href = 'https://www.paypal.com/signin';
    } else if (selectedPayment === 'binance') {
      window.location.href =
        'https://accounts.binance.com/en/login?gclid=EAIaIQobChMI7ZvOsvOZgwMVfopoCR06AwmyEAAYASAAEgI42_D_BwE&ref=804491327';
    } else if (selectedPayment === 'visa') {
      window.location.href = 'https://www.visaonline.com/login/';
    }
    console.log('Payment submitted');
    alert('Payment submitted');

    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());
    // calculate expected delivery time using distance calculated from Google Maps API
    const origin = [-1.3063965601181275, 36.85755932273569];
    // Get destination logituedesfrom locations(array of objects) based on selected location
    const destination = locations.find((location) => {
      // eslint-disable-next-line eqeqeq
      return location.id == parseInt(formObject.cityId);
    });

    console.log(destination);
    const order = {
      deliveryAddress: {
        area: formObject.cityId,
        street: formObject.street,
        building: formObject.building,
        room: formObject.room,
        notes: formObject.notes,
      },
      paymentMethod: formObject.paymentMethod,
      destination: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      origin: {
        latitude: origin[0],
        longitude: origin[1],
      },
    };
    console.log(JSON.stringify(order));
    // Navigate to tracking page with order details as props
    navigate('/tracking', { replace: false, state: order });
  };

  // TBC

  //   const userEmail = 'user@example.com';
  //   const userId = await getUserId(userEmail);

  //   if (!userId) {
  //     console.error('User ID not available');
  //     return;
  //   }

  //   const paymentMethod = e.nativeEvent.submitter.name; // Get the name of the clicked button

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/address', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user_id: userId,
  //         payment_method: paymentMethod,
  //         ...addressDetails,
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log('Address details submitted successfully');
  //       // Additional logic or redirection after successful submission
  //     } else {
  //       console.error('Failed to submit address details');
  //       // Handle the error
  //     }
  //   } catch (error) {
  //     console.error('Error during address submission:', error);
  //   }
  // };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  // const handleAddressChange = (e) => {
  //   setAddressDetails({
  //     ...addressDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleAddressValidation = () => {
  //   const isConfirmed = window.confirm('Have you confirmed the details of the address?');

  //   if (isConfirmed) {
  //     // Redirect to PaymentPage and highlight Pay Now button
  //     window.location.href = '/payment#pay-now';
  //   } else {
  //     // Redirect to PaymentPage and highlight the entire address container
  //     window.location.href = '/payment#address-container';
  //   }c
  // };

  return (
    <div>
      {<Navbar />}
      <div
        className="payment-container"
        style={{ backgroundColor: '#ff9d5723' }}
      >
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="payment-container">
            c
            <div className="card-payment1">
              <strong>Payment Options</strong>
              <br />
              <div className="payment-options">
                {['mpesa', 'cash', 'paypal', 'visa', 'binance'].map(
                  (paymentOption) => (
                    <div key={paymentOption} className="other-option">
                      <input
                        type="radio"
                        id={paymentOption}
                        name="paymentMethod"
                        value={paymentOption}
                        checked={selectedPayment === paymentOption}
                        onChange={handlePaymentChange}
                        required
                      />
                      <label htmlFor={paymentOption}>
                        <img
                          src={getImageSource(paymentOption)}
                          alt={paymentOption}
                        />
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="card-payment2">
              <strong>Delivery Address</strong>
              <div className="delivery-address-form">
                <label htmlFor="area" className="form-label">
                  Area:
                </label>
                <select
                  id="fi-cityId"
                  name="cityId"
                  className="form-label"
                  value={selectedLocation}
                  onChange={handleAreaChange}
                >
                  <option value="" disabled="">
                    Please select
                  </option>
                  <option value="1027">
                    * SELECT YOUR CITY / AREA BELOW *
                  </option>

                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="street" className="form-label">
                  Street:
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="form-input"
                  placeholder="Monrovia, UtaliiAve"
                  required
                />

                <label htmlFor="building" className="form-label">
                  Building:
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  className="form-input"
                  placeholder="GTC, Mirage, KICC, Chancery, UAP"
                  required
                />
                <label htmlFor="room" className="form-label">
                  Room:
                </label>
                <input
                  style={{ fontFamily: 'Times New Roman', fontSize: '13px' }}
                  type="text"
                  id="room"
                  name="room"
                  className="form-input"
                  placeholder="Room No. House No. Office Name"
                  required
                />

                <label htmlFor="notes" className="form-label">
                  Notes:
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-input"
                  placeholder="Anything we should know before entering your property"
                />
              </div>
            </div>
            <div className="card-total">
              <strong>Order Summary</strong>
              <hr />
              <p>Item's total: Ksh. {totalPrice}</p>
              <p>Delivery fee: Ksh. {deliveryFee} </p>
              <hr />
              <p>Total: Ksh. {grandTotal}</p>
              <hr />
              <div className="buttons-container">
                <button type="submit" className="continue-shopping">
                  Pay Now
                </button>
                <Link to={'/tracking'}>
                  <button className="continue-shopping">Pay on Delivery</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>{<Footer />}</div>
    </div>
  );
};

const getImageSource = (paymentOption) => {
  switch (paymentOption) {
    case 'mpesa':
      return mpesaLogo;
    case 'cash':
      return cashLogo;
    case 'paypal':
      return paypalLogo;
    case 'visa':
      return visaLogo;
    case 'binance':
      return binanceLogo;
    default:
      return '';
  }
};

// const getUserId = async (userEmail) => {
//   try {
//     const response = await fetch(`http://127.0.0.1:5000/user/id/${userEmail}`);
//     const data = await response.json();

//     if (response.ok) {
//       return data.user_id;
//     } else {
//       console.error('Failed to get user ID');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error during user ID retrieval:', error);
//     return null;
//   }
// };

export default PaymentPage;
