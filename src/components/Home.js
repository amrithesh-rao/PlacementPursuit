import React, { useRef, useState ,useEffect} from "react";
import NavBar from "../components/NavBar";
import Footbar from "./Footbar";
import { Button, Carousel, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {  updateProfile } from 'firebase/auth';
import { useUserAuth } from "../context/UserAuthContext";
import testCarousel from "../img/testCarousel.png";
import feedbackCarousel from "../img/feedbackCarousel.png";
import practiceCarousel from "../img/practiceCarousel.png";
import homeCarousel from "../img/homeCarousel.png";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import testSectionImg from "../img/testSectionImg.png";
import feedbackSectionImg from "../img/feedbackSectionImg.png";
import practiceSectionImg from "../img/practiceSectionImg.jpg";

const Home = () => {
  let navigate = useNavigate();
  const { user } = useUserAuth();
  const uName = useRef("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

 
  useEffect(  () => {
    if (user?.displayName!==null) {
    } else {
      handleShow();
      
    }
  }, [user?.displayName]);
    
    
    
  
 async function saveName(e){

    e.preventDefault();
    const {name}=e.target.elements
    uName.current=name.value;
    handleClose();
    updateProfile(user,{
      displayName: uName.current,
      photoURL: 'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A='
    });
    window.location.reload(); 
  }
  return (
    <>
      <div>
        <NavBar />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-75 mx-auto mb-5"
              src={homeCarousel}
              alt="First slide"
              width={800}
              height={645}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 mx-auto mb-5"
              src={practiceCarousel}
              alt="Second slide"
              width={800}
              height={645}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 mx-auto mb-5"
              src={testCarousel}
              alt="Third slide"
              width={800}
              height={645}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 mx-auto mb-5"
              src={feedbackCarousel}
              alt="Fourth slide"
              width={800}
              height={645}
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
      <Modal show={show} onHide={handleClose} centered={true} backdrop="static">
      <Form onSubmit={saveName}>
        <Modal.Header closeButton>
          <Modal.Title>Setup your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Your name will be used to save Feedback!!

          
          <Form.Control type="text" placeholder="Enter your name" name='name' />
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save
          </Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
      </div>
      
      <div className="container" id="practice">
        <div className="row">
          <div className="col">
            <img
              src={practiceSectionImg}
              alt="practice"
              width={800}
              height={450}
            />
          </div>
          <div className="col">
            <div>
              <p className="h1 p-4 mt-5">
                Practice Section holds all materials for concepts that are
                important to interview.
              </p>
            </div>
            <div className="p-2 m-3" onClick={() => navigate("/practice")}>
              <Button>Practice ---{">"}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="test">
        <div className="row">
          <div className="col">
            <div>
              <p className="h1 p-4 mt-5 ml-7">
                After studying from Practice Section, test your knowledge using
                quizes in Test Section
              </p>
            </div>
            <div className="p-2 ml-10" onClick={() => navigate("/test")}>
              <Button>Test ---{">"}</Button>
            </div>
          </div>
          <div className="col">
            <img src={testSectionImg} alt="test" width={800} height={450} />
          </div>
        </div>
      </div>

      <div className="container mb-5" id="feedback">
        <div className="row">
          <div className="col">
            <img
              src={feedbackSectionImg}
              alt="feedback"
              width={800}
              height={450}
            />
          </div>
          <div className="col">
            <div>
              <p className="h1 p-4 mt-5">
                Read feebacks from seniors and prepare accordingly for interview
                process of specific companies.
              </p>
            </div>
            <div className="p-2 m-3">
              <Button onClick={() => navigate("/feedback")}>
                Feedback ---{">"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footbar class="footBar" />
    </>
  );
};

export default Home;
