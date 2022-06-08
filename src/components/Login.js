import React, { useState, useRef, useEffect, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Form, Alert, Tabs, Tab } from "react-bootstrap";
import { Button, Carousel } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import practiceImg from "../img/practiceSectionImg.jpg";
import testImg from "../img/testSectionImg.png";
import feedbackImg from "../img/feedbackSectionImg.png";
import logo from "../img/logo.png";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";



const Login = () => {
  const [error, setError] = useState("");
  const { user, logIn, googleSignIn, logOut, setTheWho } = useUserAuth();
  
  const [gSign1, setGSign1] = useState(false);
  const [gSign2, setGSign2] = useState(false);
  const [gSign3, setGSign3] = useState(false);

  const navigate = useNavigate();


  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    const { formBasicEmailStudentl, formBasicPasswordStudentl } =
      e.target.elements;

    setError("");
    try {
      await logIn(
        formBasicEmailStudentl.value,
        formBasicPasswordStudentl.value
      );

      getDocs(
        query(
          collection(db, "usndb"),
          where("email", "==", formBasicEmailStudentl.value)
        )
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          handleLogout();
          alert("Student data does not exist");
        } else {
          navigate("/home", { replace: true });
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (gSign1 && user?.email) {
      getDocs(
        query(collection(db, "usndb"), where("email", "==", user?.email))
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          setGSign1(false);
          handleLogout();
          alert("Student data does not exist");
        } else {
          navigate("/home", { replace: true });
        }
      });
    }
  }, [user?.email, gSign1]);
  useEffect(() => {
    if (gSign2 && user?.email) {
      getDocs(
        query(collection(db, "adminDb"), where("email", "==", user?.email))
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          setGSign2(false);
          handleLogout();
          alert("Not admin");
        } else {
          setTheWho("admin")
          navigate("/home", { replace: true });
        }
      });
    }
  }, [user?.email, gSign2]);
  useEffect(() => {
    if (gSign3 && user?.email) {
      getDocs(
        query(collection(db, "alumniDb"), where("email", "==", user?.email))
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          setGSign3(false);
          handleLogout();
          alert("Not alumni");
        } else {
          setTheWho("alumni")
          navigate("/home", { replace: true });
        }
      });
    }
  }, [user?.email, gSign3]);
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleSignInStudent = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      setGSign1(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    const { formBasicEmailAdminl, formBasicPasswordAdminl } = e.target.elements;

    setError("");
    try {
      await logIn(formBasicEmailAdminl.value, formBasicPasswordAdminl.value);
      getDocs(
        query(
          collection(db, "adminDb"),
          where("email", "==", formBasicEmailAdminl.value)
        )
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          handleLogout();
          alert("Not admin");
        } else {
          setTheWho("admin")
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
      setGSign2(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitAlumni = async (e) => {
    e.preventDefault();
    const { formBasicEmailAlumnil, formBasicPasswordAlumnil } =
      e.target.elements;

    setError("");
    try {
      await logIn(formBasicEmailAlumnil.value, formBasicPasswordAlumnil.value);

      getDocs(
        query(
          collection(db, "alumniDb"),
          where("email", "==", formBasicEmailAlumnil.value)
        )
      ).then((snapshot) => {
        if (snapshot.docs.length === 0) {
          handleLogout();
          alert("Not alumni");
        } else {
          setTheWho("alumni")
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
      setGSign3(true);
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
              <img src={logo} alt="logo" className="mx-auto img-logo" />

              <Tabs
                defaultActiveKey="student"
                id="uncontrolled-tab-login"
                className="mb-3 tabcenter"
              >
                <Tab eventKey="student" title="Student">
                  <div className="box-pad box">
                    {error && (
                      <Alert
                        className="w-65 mx-auto"
                        variant="danger"
                        onClose={() => setError("")}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmitStudent}>
                      <Form.Group
                        className="mb-3 w-65 mx-auto"
                        controlId="formBasicEmailStudentl"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordStudentl"
                      >
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
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
                  <hr className="style-eight m-1 w-65 mx-auto" />
                  <div>
                    <GoogleButton
                      className="g-btn w-65 mx-auto mt-4"
                      type="dark"
                      onClick={handleGoogleSignInStudent}
                    />
                  </div>
                </Tab>
                <Tab eventKey="admin" title="Admin">
                  <div className="box-pad box">
                    {error && (
                      <Alert
                        className="w-65 mx-auto"
                        variant="danger"
                        onClose={() => setError("")}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmitAdmin}>
                      <Form.Group
                        className="mb-3 w-65 mx-auto"
                        controlId="formBasicEmailAdminl"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordAdminl"
                      >
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
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
                  <hr className="style-eight m-1 w-65 mx-auto" />
                  <div>
                    <GoogleButton
                      className="g-btn w-65 mx-auto mt-4"
                      type="dark"
                      onClick={handleGoogleSignInAdmin}
                    />
                  </div>
                </Tab>
                <Tab eventKey="alumni" title="Alumni">
                  <div className="box-pad box">
                    {error && (
                      <Alert
                        className="w-65 mx-auto"
                        variant="danger"
                        onClose={() => setError("")}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmitAlumni}>
                      <Form.Group
                        className="mb-3 w-65 mx-auto"
                        controlId="formBasicEmailAlumnil"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordAlumnil"
                      >
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
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
                  <hr className="style-eight m-1 w-65 mx-auto" />
                  <div>
                    <GoogleButton
                      className="g-btn w-65 mx-auto mt-4"
                      type="dark"
                      onClick={handleGoogleSignInAlumni}
                    />
                  </div>
                </Tab>
              </Tabs>

              {/* <div className="box-pad box">
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
          </div> */}
            </div>
          </div>

          <div className="col img-padding">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={practiceImg}
                  alt="First slide"
                  width={200}
                  height={500}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={testImg}
                  alt="Second slide"
                  width={200}
                  height={500}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={feedbackImg}
                  alt="Third slide"
                  width={200}
                  height={500}
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
