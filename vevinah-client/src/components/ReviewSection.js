import React from "react";
// import clientImage from "../assets/logo192.png";
import reviewer1 from "../assets/reviewer1.jpg"
import reviewer2 from "../assets/reviewer2.jpg"
import reviewer3 from "../assets/reviewer3.jpg"
import reviewer4 from "../assets/reviewer4.jpg"


const ReviewCard = ({ customerReview}) => {
  const { name, image, rating, content } = customerReview;

  return (
    <div className="customer-review-card">
      <div className="review-header">
        <img src={image} alt={`${name}'s profile`} className="customer-image" />
        <div className="review-info">
          <div className="star-ratings">
            {[...Array(rating).keys()].map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
          </div>
        </div>
      </div>
      <p style={{color:"black"}} className="review-content">{content}</p>
    </div>
    

  )
}


const ReviewSection = () => {
  let customerReviews = [{
    image: reviewer3,
    name: "John Doe",
    rating: 4,
    content: "What a delightful dining experience!",
  },
  {
    image: reviewer1,
    name: "John Doe",
    rating: 5,
    content: "Exceptional in every way! Will definitely order again :)",
  },
  {
    image: reviewer4,
    name: "John Doe",
    rating: 4,
    content: "A hidden gem! Highly recommend!",
  },
  {
    image: reviewer2,
    name: "John Doe",
    rating: 4,
    content: "Exquisite food and such a lovely space. Will be going again :)",
  },
 
];

  return (
   <div className="review-cards">
   {customerReviews.map((review, index) => (
     <ReviewCard style={{color:"black"}} key={index} customerReview={review} />
   ))}
 </div>

  );
};

export default ReviewSection;
