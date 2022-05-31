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
import { useParams } from "react-router-dom";
import { Form, Button ,Modal} from "react-bootstrap";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function AddFeedback() {
  const [pt, setPt] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [usn,setUsn] = useState("");
  const info = useRef({});
  const { user } = useUserAuth();
  let navigate = useNavigate();

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const options = [
    { name: "Amazon", value: "Amazon" },
    { name: "Cisco", value: "Cisco" },
    { name: "Sabre", value: "Sabre" },
    { name: "VMware", value: "VMware" },
    { name: "Redbus", value: "Redbus" },
    { name: "Mercedes Benz", value: "Mercedes Benz" },
    { name: "Microfocus", value: "Microfocus" },
    { name: "Aurigo", value: "Aurigo" },
    { name: "Wdc", value: "Wdc" },
    { name: "Hpe", value: "Hpe" },
    { name: "Oracle", value: "Oracle" },
    {name: 'JP Morgan', value: 'JP Morgan'},
    {name: 'Zscalar',value: 'Zscalar'},
    {name: 'Fidelity',value: 'Fidelity'},
    {name: 'Qualcomm',value: 'Qualcomm'},
    {name: 'Deloitte',value: 'Deloitte'},
    {name: 'Thoughtworks',value: 'Thoughtworks'},
    {name: 'Infosys', value: 'Infosys'},
    {name: 'Cashfree', value: 'Cashfree'},
    {name: 'Amagi', value: 'Amagi'},
    {name: 'Dxc', value: 'Dxc'},
    {name: 'Cimpress', value: 'Cimpress'},
    {name: 'Lam Research', value: 'Lam Research'},
    {name: 'Visa', value: 'Visa'},
    {name: 'Sap Lab', value: 'Sap Lab'},
    {name: 'Samsung', value: 'Samsung'},
    {name: 'Optum', value: 'Optum'},
    {name: 'Applied Materials', value: 'Applied Materials'},
    {name: 'Intel', value: 'Intel'},
    {name: 'Mitel', value: 'Mitel'},
    {name: 'Aris Global', value: 'Aris Global'},
    {name: 'Microchip', value: 'Microchip'},
    {name: 'Games 24*7', value: 'Games 24*7'},
    {name: 'Max Linear', value: 'Max Linear'},
    {name: 'Juniper Networks', value: 'Juniper Networks'},
    {name: 'Nokia', value: 'Nokia'},
    {name: 'Clumio Technologies', value: 'Clumio Technologies'},
    {name: 'Juspay', value: 'Juspay'},
    {name: 'Byjus', value: 'Byjus'},
    {name: 'Hcl', value: 'Hcl'},
    {name: 'Cognizant', value: 'Cognizant'},
    {name: 'Tavant', value: 'Tavant'},
    {name: 'Toshibha', value: 'Toshibha'},
    {name: 'Wipro', value: 'Wipro'},
    {name: 'Toyota', value: 'Toyota'},
    {name: 'TE Connectivity', value: 'TE Connectivity'},
    {name: 'Sandvine', value: 'Sandvine'},
    {name: 'TCS', value: 'TCS'},
    {name: 'Logmein', value: 'Logmein'},
    {name: 'Accenture', value: 'Accenture'},
    {name: 'Danske IT ', value: 'Danske IT '},
    {name: 'Dell', value: 'Dell'},
    {name: 'Volvo', value: 'Volvo'},
    {name: 'Philips', value: 'Philips'},   
    {name: 'Avaya', value: 'Avaya'},
    {name: 'Publicis Sapient ', value: 'Publicis Sapient '},
    {name: 'Bosch', value: 'Bosch'},
    {name: 'Schneider Electric', value: 'Schneider Electric'},
    {name: 'Informatica', value: 'Informatica'},
    {name: 'IBM', value: 'IBM'},
    {name: 'Kantar', value: 'Kantar'},
    {name: 'Tech Mahindra', value: 'Tech Mahindra'},
    {name: 'Mindtree', value: 'Mindtree'},
    {name: 'Blue Yonder', value: 'Blue Yonder'},
    {name: 'GE', value: 'GE'},
    {name: 'Zensar', value: 'Zensar'},   
    {name: 'Ericsson Global', value: 'Ericsson Global'},
    {name: 'Infoworks', value: 'Infoworks'},
    {name: 'Collins Aerospace', value: 'Collins Aerospace'},
    {name: 'L&T', value: 'L&T'},
    {name: 'Lenscart', value: 'Lenscart'},
    {name: 'Pensando', value: 'Pensando'},
  ];


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
        console.log(info.current.usn)
    }
    catch(e){
        console.log(e);
    }
  },[user?.email])
  

  async function addNewFeedback(e) {
    e.preventDefault();
    const collRef1 = collection(db, "feedbackdb");
    const docSnap = await getDocs(
      query(collRef1, where("email", "==", user?.email))
    );
        if(docSnap.docs.length!==0){
            console.log(docSnap.docs)
            handleShow1();
        }else{
    const { formCTC, formExperience, formRole,formYear,formWord } = e.target.elements;
    const collRef = collection(db, "feedbackdb");
    const payload = {
      company_name: pt,
      ctc: formCTC.value,
      experience: formExperience.value,
      role: formRole.value,
      name: user.displayName,
      email:user.email,
      usn:info.current?.usn,
      year:formYear.value,
      word:formWord.value
    };
    await addDoc(collRef, payload);
    handleShow2();
    setTimeout(()=>navigate("/Feedback"),5000)
        }
  }

  return (
    <>
      <NavBar />
      <h2 className="subtopic-name">Add Feedback</h2>
      <div className="feedbox mb-5">
        <div className="feedreportbox w-75 mx-auto">
          <Form onSubmit={addNewFeedback}>
            <div className="mx-auto">
            <Form.Group className="mt-3 mb-3 w-25 single-line ms-5 me-4" controlId="formUSN">
              <Form.Label>USN</Form.Label>
              <Form.Control type="number" placeholder={info.current.usn} disabled />
            </Form.Group>
            <Form.Group className="mt-3 mb-3 w-25 single-line ms-5 me-4" controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" defaultValue={2022} step={1} required/>
            </Form.Group>
            <Form.Group className="mt-3 mb-3 w-25 single-line ms-5" controlId="formCompany">
            <Form.Label>Company</Form.Label>

            <SelectSearch
              options={options}
              search
              filterOptions={fuzzySearch}
              onChange={setPt}
              value={pt}
              placeholder="Select company name"
            />
            </Form.Group>
            </div>
          
            
            <Form.Group className=" mb-3 w-50 single-line ms-5 me-4" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter your role" required/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 single-line ms-5 me-4" controlId="formCTC">
              <Form.Label>CTC</Form.Label>
              <Form.Control type="float" placeholder="CTC in lakhs" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience" >
              <Form.Label>Experience</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your Experience" required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWord">
              <Form.Label>Word to Aspirants</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Piece of advice for juniors.."
              />
            </Form.Group>
            <Button className="btn-ctr mx-auto" variant="primary" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </div>
      </div>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Cannot add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>Feedback in your Name already exits!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>navigate('/Feedback')}>
            Go back to Feedback page
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Successfully Added!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for helping others.Redirecting you to Feedback Page in 5 secs</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>navigate('/Feedback')}>
            Go back to Feedback page
          </Button>
        </Modal.Footer>
      </Modal>

      <Footbar class="footBar-bottom" />
    </>
  );
}
