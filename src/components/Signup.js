import React, { useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Alert, Tabs, Tab } from "react-bootstrap";
import { Button,Carousel } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import GoogleButton from "react-google-button";
import practiceImg from "../img/practiceSectionImg.jpg";
import testImg from "../img/testSectionImg.png";
import feedbackImg from "../img/feedbackSectionImg.png";
import logo from "../img/logo.png";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [error, setError] = useState("");
  const { user, signUp, googleSignIn, logOut } = useUserAuth();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    setError("");
    const {formBasicEmailStudent,formBasicPassword1Student,formBasicPassword2Student } = e.target.elements;

    console.log(formBasicEmailStudent.value)


    if (formBasicPassword1Student.value !== formBasicPassword2Student.value) {
      return setError("Passwords do not match")
    }
    try {
        await signUp(formBasicEmailStudent.value, formBasicPassword1Student.value)

           getDocs(
            query(collection(db, "usndb"), where("email", "==", formBasicEmailStudent.value))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Student data does not exist");
            } else {

      
              navigate("/home", { replace: true });
            }
          });
        
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignInStudent = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      // if (str === "admin") {
      //   if (user?.email !== undefined) {
      //     getDocs(
      //       query(collection(db, "adminDb"), where("email", "==", user?.email))
      //     ).then((snapshot) => {
      //       if (snapshot.docs.length === 0) {
      //         alert("Not admin");
      //       } else {
      //         navigate("/home", { replace: true });
      //       }
      //     });
      //   }
      // } else if (str === "alumni") {
      //   if (user?.email !== undefined) {
      //     getDocs(
      //       query(collection(db, "alumniDb"), where("email", "==", user?.email))
      //     ).then((snapshot) => {
      //       if (snapshot.docs.length === 0) {
      //         alert("Not alumni");
      //       } else {
      //         navigate("/home", { replace: true });
      //       }
      //     });
      //   }
      // } else if (str === "student") {
        if(user?.email)
          getDocs(
            query(collection(db, "usndb"), where("email", "==", user?.email))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Student data does not exist");
            } else {
              navigate("/home", { replace: true });
            }
          });
        
      

    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    setError("");
    const {formBasicEmailAdmin,formBasicPassword1Admin,formBasicPassword2Admin } = e.target.elements;

    console.log(formBasicEmailAdmin.value)


    if (formBasicPassword1Admin.value !== formBasicPassword2Admin.value) {
      return setError("Passwords do not match")
    }
    try {

      await signUp(formBasicEmailAdmin.value, formBasicPassword1Admin.value);
      

          getDocs(
            query(collection(db, "adminDb"), where("email", "==", formBasicEmailAdmin.value))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Not admin");
            } else {
              navigate("/home", { replace: true });
            }
          });
        

      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignInAdmin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      if(user?.email)
          getDocs(
            query(collection(db, "adminDb"), where("email", "==", user?.email))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Not admin");
            } else {
              navigate("/home", { replace: true });
            }
          });
        
      

    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitAlumni = async (e) => {
    e.preventDefault();
    setError("");
    const {formBasicEmailAlumni,formBasicPassword1Alumni,formBasicPassword2Alumni } = e.target.elements;

    if (formBasicPassword1Alumni.value !== formBasicPassword2Alumni.value) {
      return setError("Passwords do not match")
    }
    try {
      await signUp(formBasicEmailAlumni.value, formBasicPassword1Alumni.value);


          getDocs(
            query(collection(db, "alumniDb"), where("email", "==", formBasicEmailAlumni.value))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Not alumni");
            } else {
              navigate("/home", { replace: true });
            }
          });
        

      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignInAlumni = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      if(user?.email)
          getDocs(
            query(collection(db, "alumniDb"), where("email", "==", user?.email))
          ).then((snapshot) => {
            if (snapshot.docs.length === 0) {
              handleLogout()
              alert("Not alumni");
            } else {
              navigate("/home", { replace: true });
            }
          });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (

    <><div className="container">
      <div className="row row-center">
        <div className="col form-padding">
          
        <div className="col-padding">
        <img src={ logo } alt="logo" className="mx-auto img-logo" />
        



        <Tabs
                defaultActiveKey="student"
                id="uncontrolled-tab-signup"
                className="mb-3 tabcenter"
              >
  <Tab eventKey="student" title="Student">

  <div className="box-pad box">
        
        {error && <Alert className="w-65 mx-auto" variant="danger" onClose={()=> setError("") } dismissible>{error}</Alert>}
        <Form onSubmit={handleSubmitStudent}>
          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicEmailStudent">
            <Form.Control
              type="email"
              placeholder="Email address"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword1Student">
            <Form.Control
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword2Student">
            <Form.Control
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>

          <div className="d-grid gap-2 w-65 mx-auto">
            <Button variant="primary" type="Submit">
              Create account
            </Button>
          </div>
        </Form>
      </div>
      <div className="box mt-2 mb-4 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <hr className="style-eight m-1 w-65 mx-auto"/>
      <div>
          <GoogleButton
            className="g-btn mt-4 w-65 mx-auto"
            type="dark"
            onClick={handleGoogleSignInStudent}
          />
        </div>


  </Tab>
  <Tab eventKey="admin" title="Admin">

  <div className="box-pad box">
        
        {error && <Alert className="w-65 mx-auto" variant="danger" onClose={()=> setError("") } dismissible>{error}</Alert>}
        <Form onSubmit={handleSubmitAdmin}>
          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicEmailAdmin">
            <Form.Control
              type="email"
              placeholder="Email address"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword1Admin">
            <Form.Control
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword2Admin">
            <Form.Control
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>

          <div className="d-grid gap-2 w-65 mx-auto">
            <Button variant="primary" type="Submit">
              Create account
            </Button>
          </div>
        </Form>
      </div>
      <div className="box mt-2 mb-4 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <hr className="style-eight m-1 w-65 mx-auto"/>
      <div>
          <GoogleButton
            className="g-btn mt-4 w-65 mx-auto"
            type="dark"
            onClick={handleGoogleSignInAdmin}
          />
        </div>

  </Tab>
  <Tab eventKey="alumni" title="Alumni">

  <div className="box-pad box">
        
        {error && <Alert className="w-65 mx-auto" variant="danger" onClose={()=> setError("") } dismissible>{error}</Alert>}
        <Form onSubmit={handleSubmitAlumni}>
          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicEmailAlumni">
            <Form.Control
              type="email"
              placeholder="Email address"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword1Alumni">
            <Form.Control
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword2Alumni">
            <Form.Control
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>

          <div className="d-grid gap-2 w-65 mx-auto">
            <Button variant="primary" type="Submit">
              Create account
            </Button>
          </div>
        </Form>
      </div>
      <div className="box mt-2 mb-4 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <hr className="style-eight m-1 w-65 mx-auto"/>
      <div>
          <GoogleButton
            className="g-btn mt-4 w-65 mx-auto"
            type="dark"
            onClick={handleGoogleSignInAlumni}
          />
        </div>


  </Tab>
</Tabs>
        
        
        {/* <div className="box-pad box">
        
        {error && <Alert className="w-65 mx-auto" variant="danger" onClose={()=> setError("") } dismissible>{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e,"admin")}>
          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              ref = { emailRef }
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              ref = { passwordConfirmRef }
            />
          </Form.Group>

          <Form.Group className="mb-3 w-65 mx-auto" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              ref = { passwordRef }
            />
          </Form.Group>

          <div className="d-grid gap-2 w-65 mx-auto">
            <Button variant="primary" type="Submit">
              Create account
            </Button>
          </div>
        </Form>
      </div>
      <div className="box mt-2 mb-4 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <hr className="style-eight m-1 w-65 mx-auto"/>
      <div>
          <GoogleButton
            className="g-btn mt-4 w-65 mx-auto"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div> */}
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
  )
};

export default Signup;