import React from "react";
import Register from "./SignUp";
import SignIn from "./SignIn";
import Carousel1 from "../assets/dineinphoto.jpg";

const SignUpAndSignIn = () => {
  const image = [Carousel1];

  return (
    <div style={{backgroundColor: "#ff9d5723"}}className="container">
        <div className="col-lg-6">
          <Register />
        </div>
        <div className="line"></div>
        <div className="col-lg-6">
          <SignIn />
        </div>
      
    </div>
  );
};

export default SignUpAndSignIn;
