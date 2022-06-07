import React, { useRef, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footbar from "./Footbar";
import { Button, Carousel, Modal, Form } from "react-bootstrap";
import { useNavigate ,useLocation} from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useUserAuth } from "../context/UserAuthContext";
import testCarousel from "../img/testCarousel.png";
import feedbackCarousel from "../img/feedbackCarousel.png";
import practiceCarousel from "../img/practiceCarousel.png";
import homeCarousel from "../img/homeCarousel.png";
import testSectionImg from "../img/testSectionImg.png";
import feedbackSectionImg from "../img/feedbackSectionImg.png";
import practiceSectionImg from "../img/practiceSectionImg.jpg";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  let navigate = useNavigate();
  const { user, logOut } = useUserAuth();
  const uName = useRef("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const usn = useRef("");
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [ allow, setAllow ] = useState(false);
  useEffect(() => {
    // try {
    //   if (user.email !== undefined) {
    //     getDocs(
    //       query(collection(db, "adminDb"), where("email", "==", user?.email))
    //     ).then((snapshot) => {
    //       if (snapshot.docs.length === 0) {
    //         //he student or outsider
    //         getDocs(
    //           query(collection(db, "usndb"), where("email", "==", user?.email))
    //         ).then((snapshot) => {
    //           if (snapshot.docs.length === 0) {
    //             //outsider
    //             console.log("Outsider");
    //             handleLogoutOutsider();
    //           } else {
    //             // allow.current = true;
    //             setAllow(true)
    //             usn.current = snapshot.docs[0].data()?.usn;
    //             console.log("This guy student");
    //           }
    //         });
  
    //         // handleShow2();
    //       } else {
    //         // allow.current = true;
    //         setAllow(true)
    //         console.log("This guy admin");
    //         //admin
    //       }
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    if (user?.displayName !== null) {
    } else {
      handleShow1();
    }
  }, [user.email]);

  

  useEffect(() => {
    const setUser = async () => {
      if (user.uid !== undefined) {
        const docRef = doc(db, "userdb", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
        } else {
          await setDoc(docRef, {
            userName: user?.displayName,
            usn: usn.current,
            id: user?.uid,
          });
        }
      }
    };
    // if (allow) 
    setUser();
  }, []);

  console.log(allow);
  async function saveName(e) {
    e.preventDefault();
    const { name } = e.target.elements;
    uName.current = name.value;
    handleClose1();
    updateProfile(user, {
      displayName: uName.current,
      photoURL:
        "https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=",
    });
    navigate(0);
  }
  const handleLogoutOutsider = async () => {
    try {
      await logOut();
      navigate("../404.js", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (

    // allow ?
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
        <Modal
          show={show1}
          onHide={handleClose1}
          centered={true}
          backdrop="static"
        >
          <Form onSubmit={saveName}>
            <Modal.Header closeButton>
              <Modal.Title>Setup your name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your name will be used to save Feedback!!
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      {/* <div>
      <Modal show={show2} onHide={handleClose2} centered={true} backdrop="static">
      
        <Modal.Header >
          <Modal.Title>Sorry!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        We are currently open only to SJCE students.

          
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogout}>
            Exit
          </Button>
          
        </Modal.Footer>
       
      </Modal>
      </div> */}

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
              <p className="h1 p-4 mt-5 desc">
                Practice Section holds all materials for concepts that are
                important to interview.
              </p>
            </div>
            <div className="p-2 m-3" onClick={() => navigate("/practice")}>
              <Button size="lg">Practice ---{">"}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="test">
        <div className="row">
          <div className="col">
            <div>
              <p className="h1 p-4 mt-5 ml-7 desc">
                After studying from Practice Section, test your knowledge using
                quizes in Test Section
              </p>
            </div>
            <div className="p-2 ml-10" onClick={() => navigate("/test")}>
              <Button size="lg">Test ---{">"}</Button>
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
              <p className="h1 p-4 mt-5 desc">
                Read feebacks from seniors and prepare accordingly for interview
                process of specific companies.
              </p>
            </div>
            <div className="p-2 m-3">
              <Button size="lg" onClick={() => navigate("/feedback")}>
                Feedback ---{">"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footbar class="footBar" />
    </>
  //  : 
  //   ""
  )
};

export default Home;
