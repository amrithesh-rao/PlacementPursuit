import React, { useRef, useState ,useEffect} from "react";
import { Navbar , Container, Nav,NavDropdown } from 'react-bootstrap';
import logo from '../img/logo.png';
import { useUserAuth } from "../context/UserAuthContext";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  updateProfile } from 'firebase/auth';
import { collection, query, where, getDoc } from "firebase/firestore";

export default function NavBar() {
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();
    const uName = useRef("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ isAdmin,setAdmin ] = useState(false);
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      }
      async function saveName(e){

        e.preventDefault();
        const {name}=e.target.elements
        uName.current=name.value;
        handleClose();
        updateProfile(user,{
          displayName: uName.current
          });
        navigate(0); 
      }
    //   useEffect(() => {
    //     getDocs(query(colRef, where("email", "==", user?.email)))
    //     .then( snapshot => {
          
    //       if(snapshot.docs.length === 0)
    //       handleShow2();
    //       usn.current=snapshot.docs[0].data().usn;

    //     })

    // },[]);
  return (
    <>
    <Navbar collapse OnSelect expand="lg"  variant="light">
  <Container className='navBar'>
  <Navbar.Brand onClick={() => navigate("/home")}><img className='size-m' src={logo} alt='logo' /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto" >
      <Nav.Link onClick={() => navigate("/practice")} >Practice</Nav.Link>
      <Nav.Link onClick={() => navigate("/test")}>Test</Nav.Link>
      <Nav.Link onClick={() => navigate("/feedback")}>Feedback</Nav.Link>
    </Nav>
    <Nav className="mr-7">
        
    <img src={user.photoURL} className="profile-pic" alt="profile"/>
      <NavDropdown title={user.displayName} id="collasible-nav-dropdown">

        <NavDropdown.Item onClick={ handleShow }>Edit Name</NavDropdown.Item>
        
        <NavDropdown.Item onClick={ ()=>navigate("/dashboard") }>Dashboard</NavDropdown.Item>
        <NavDropdown.Item onClick={ handleLogout }>Log Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
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
      </>
  )
}
