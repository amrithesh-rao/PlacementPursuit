import React, { useEffect, useState,useRef } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useParams } from "react-router-dom";
import { Form, Button ,Modal} from "react-bootstrap";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function SiteFeedback() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [usn,setUsn] = useState("");
  const info = useRef({});
  let payload={};
  const { user } = useUserAuth();
  let navigate = useNavigate();

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

 


  useEffect(()=>{
    const colRef = collection(db, "usndb");
      
    try{
      if(user?.email!==undefined){
      getDocs(query(colRef, where("email", "==", user?.email)))
          .then( snapshot => {
            info.current=snapshot.docs[0].data()
            setUsn(info.current.usn)
              
          })
        }
    }
    catch(e){
        console.log(e);
    }
  },[user?.email])
  

  async function addSiteFeedback(e) {
    e.preventDefault();
    const { formUsability, formUsabilityNo1, formUsabilityNo2,formFeatureRequest,formSuggestions } = e.target.elements;
    console.log(formUsability.value, formUsabilityNo1, formUsabilityNo2,formFeatureRequest,formSuggestions,usn)
    payload = {
        usn:usn,
        usability:formUsability.value,
        usabilityReason:formUsabilityNo1.value,
        usabilityImprovement:formUsabilityNo2.value,
        featureRequest:formFeatureRequest.value,
        suggestions:formSuggestions.value
      };
      const collRef = collection(db, "siteFeedback");

await addDoc(collRef, payload);
      handleShow2();
      setTimeout(()=>navigate("/home"),5000)
      
        
  }
  
  return (
    <>
      <NavBar />
      <Button variant="light" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
      <h2 className="subtopic-name">Site Feedback</h2>
      <div className="feedbox mb-5">
        <div className="feedreportbox w-50 mx-auto">
          <Form onSubmit={addSiteFeedback}>
            <div className="mx-auto">
            <Form.Group className="w-75 mx-auto" controlId="formUsability">
              <Form.Label className="bold-font">Is it easy to use this site?</Form.Label>
              <Form.Select >
  <option value="yes">Yes</option>
  <option value="no">No</option>
</Form.Select>
            </Form.Group>
            <Form.Group className="my-2 w-75 mx-auto" controlId="formUsabilityNo1">
              <Form.Label className="bold-font">What feature did you find difficult to use?</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="my-2 w-75 mx-auto" controlId="formUsabilityNo2">
              <Form.Label className="bold-font">Any suggestions to change it?</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="my-2 w-75 mx-auto" controlId="formFeatureRequest">
              <Form.Label className="bold-font">Any Feature you want to to be added?</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="my-2  w-75 mx-auto" controlId="formSuggestions" >
              <Form.Label className="bold-font">Any other sugestions</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter here" required
              />
            </Form.Group>
            
            
            </div>
          
            
            
            <Button className="btn-ctr mx-auto mt-4" variant="primary" type="submit">
            <FontAwesomeIcon icon={solid('paper-plane')}/> Submit Feedback
            </Button>
          </Form>
        </div>
      </div>
      
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Successfully Added!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for helping us improve the site.Redirecting you to Home Page in 5 secs</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>navigate('/home')}>
            Go back to Home page
          </Button>
        </Modal.Footer>
        </Modal>

      <Footbar class="footBar-bottom" />
    </>
  );
}
