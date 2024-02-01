import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


const DineInReservation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [tableNumber, setTableNumber] = useState(1);
  const [email, setEmail] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGuestsChange = (e) => {
    setNumberOfGuests(parseInt(e.target.value, 10));
  };

  const handleTableChange = (e) => {
    setTableNumber(parseInt(e.target.value, 10));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBookNow = async () => {
    try {
      const response = await fetch('http://localhost:5000/send_confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          numberOfGuests,
          tableNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Reservation confirmed! Confirmation email sent.');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="reservation-form">
        <h1>Reservation</h1>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <select value={numberOfGuests} onChange={handleGuestsChange}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} Guest{num !== 0 && 's'}
            </option>
          ))}
        </select>
        <select value={tableNumber} onChange={handleTableChange}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              Table {num + 1}
            </option>
          ))}
        </select>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default DineInReservation;
