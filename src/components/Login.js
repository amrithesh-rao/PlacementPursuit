import React, { useState, useRef, useEffect, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Form, Alert, Tabs, Tab, Modal } from "react-bootstrap";
import { Button, Carousel } from "react-bootstrap";
import GoogleButton from "react-google-button";
import Footbar from "./Footbar";
import { useUserAuth } from "../context/UserAuthContext";
import practiceImg from "../img/practiceSectionImg.jpg";
import testImg from "../img/testSectionImg.png";
import feedbackImg from "../img/feedbackSectionImg.png";
import logo from "../img/logo.png";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Login = () => {
  const [error, setError] = useState("");
  const { user, logIn, googleSignIn, logOut } = useUserAuth();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

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
          handleShow1();
        } else {
          localStorage.setItem("who", "Student");
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
          handleShow1();
        } else {
          localStorage.setItem("who", "Student");
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
          handleShow2();
        } else {
          localStorage.setItem("who", "Admin");
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
          handleShow3();
        } else {
          localStorage.setItem("who", "Alumni");
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
          handleShow2();
        } else {
          localStorage.setItem("who", "Admin");
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
          handleShow3();
        } else {
          localStorage.setItem("who", "Alumni");
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
                    <Modal
                      show={show1}
                      onHide={handleClose1}
                      centered={true}
                      backdrop="static"
                    >
                      <Modal.Header>
                        <Modal.Title className="quiz-end">Sorry!!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        You are not authorized to login as Student.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose1}>
                          Okay
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      centered={true}
                      backdrop="static"
                    >
                      <Modal.Header>
                        <Modal.Title className="quiz-end">Sorry!!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        You are not authorized to login as Admin.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose2}>
                          Okay
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
                      show={show3}
                      onHide={handleClose3}
                      centered={true}
                      backdrop="static"
                    >
                      <Modal.Header>
                        <Modal.Title className="quiz-end">Sorry!!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        You are not authorized to login as Alumni.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose3}>
                          Okay
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Form onSubmit={handleSubmitStudent}>
                      <Form.Group
                        className="mb-3 w-65 mx-auto"
                        controlId="formBasicEmailStudentl"
                      >
                        <Form.Control
                          
                          type="email"
                          className="input-icon"
                          placeholder="&#xf007;  Email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordStudentl"
                      >
                        <Form.Control
                          
                          type="password"
                          className="input-icon"
                          placeholder="&#xf09c;  Password"
                        />
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
                      <div className="d-grid gap-2 w-65 mx-auto">
                        <Button variant="primary" type="Submit">
                          <FontAwesomeIcon icon={solid("right-to-bracket")} />{" "}
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
                          className="input-icon"
                          placeholder="&#xf007;  Email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordAdminl"
                      >
                        <Form.Control type="password" className="input-icon"
                          placeholder="&#xf09c;  Password"/>
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
                      <div className="d-grid gap-2 w-65 mx-auto">
                        <Button variant="primary" type="Submit">
                        <FontAwesomeIcon icon={solid("right-to-bracket")} />{" "}
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
                          className="input-icon"
                          placeholder="&#xf007;  Email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="w-65 mx-auto"
                        controlId="formBasicPasswordAlumnil"
                      >
                        <Form.Control type="password" className="input-icon"
                          placeholder="&#xf09c;  Password" />
                      </Form.Group>
                      <div className="forgot-pass mx-auto mb-3">
                        <Link to="/reset">Forgot password?</Link>
                      </div>
                      <div className="d-grid gap-2 w-65 mx-auto">
                        <Button variant="primary" type="Submit">
                        <FontAwesomeIcon icon={solid("right-to-bracket")} />{" "}
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
      <Footbar class="footBar-bottom" />
    </>
  );
};

export default Login;
