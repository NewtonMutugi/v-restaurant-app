import React from 'react';
import breakfast from '../assets/Toast.png';
import lunch from '../assets/RiceCurry.png';
import soup from '../assets/PumpkinSoup.png';


const TodaysSpecialSection = () => {
  const cardsData = [
    {
      id: 1,
      image: breakfast,
      title: 'Breakfast',
      description: 'Toast served alongside African Tea and fruit salad',
    },
    {
      id: 2,
      image: lunch,
      title: 'Lunch',
      description: 'Rice and coconut chicken curry offered with fresh juice',
    },
    {
      id: 3,
      image: soup,
      title: 'Soup of the day',
      description: 'Pumpkin soup and other descriptions',
    },
  ];

  return (
    <>
    <div className='todays-special-heading'>
        <h3>Today's Special</h3>
     
    </div>
    <div className="card-section">
        
       {cardsData.map((card) => (
         <div key={card.id} className="card">
           <img src={card.image} alt={`Card ${card.id}`} />
           <h3>{card.title}</h3>
           <p>{card.description}</p>
         </div>
       ))}
     </div>
    </>
    
       
  );
};

export default TodaysSpecialSection;
