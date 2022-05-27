import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button ,Carousel } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import practiceImg from "../img/practiceSectionImg.jpg";
import testImg from "../img/testSectionImg.png";
import feedbackImg from "../img/feedbackSectionImg.png";
import logo from "../img/logo.png";

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <div className="container">
      <div className="row row-center">
        <div className="col form-padding">
        <div className="col-padding">
        <img src={ logo } alt="logo" className="mx-auto img-logo" />
      <div className="box-pad box">
        {error && <Alert className="w-65 mx-auto" variant="danger" onClose={()=> setError("") } dismissible>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              ref = { emailRef }
            />
          </Form.Group>

          <Form.Group className="w-65 mx-auto" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              ref = { passwordRef }
            />
          </Form.Group>
          <div className="forgot-pass mx-auto mb-3"><Link to="/reset" >Forgot password?</Link></div>
          <div className="d-grid gap-2 w-65 mx-auto">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
          <div className="box mt-1 mb-4 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
        </Form>
        </div>
        <hr className="style-eight m-1 w-65 mx-auto"/>
        <div>
          <GoogleButton
            className="g-btn w-65 mx-auto mt-4" 
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      </div>
      
      

      <div className="col img-padding">
        <Carousel >
  <Carousel.Item>
    <img
      className="d-block w-100"
      src= { practiceImg }
      alt="First slide"
      width={200} height={500}
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src= { testImg }
      alt="Second slide"
      width={200} height={500}
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src= { feedbackImg }
      alt="Third slide"
      width={200} height={500}
    />
  </Carousel.Item>
</Carousel>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;