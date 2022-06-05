import React, { useEffect, useState, useRef } from "react";
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
import { Form, Button, Modal, Tabs, Tab,Alert } from "react-bootstrap";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function Contribute() {
  const [show,setShow] = useState(false)
  const [key, setKey] = useState("practice");
  const [pt,setPt] = useState("");
  const [pst,setPst] = useState("");
  const [qt,setQt] = useState("");
  const [ql,setQl] = useState("");

  const pTOptions = [
    { name: "Os", value: "os" },
    { name: "Ds", value: "ds" },
    { name: "Cn", value: "cn" }
  ];

  const pSTOptions = [
    { name: "Os", value: "os" },
    { name: "Ds", value: "ds" },
    { name: "Cn", value: "cn" }
  ];

  const qTOptions = [
    {
      name: "Data Structures",
      value: "xUddbjWlwvVpbvXn5aHZ",
    },
    {
      name: "Operating Systems",
      value: "o3HDaE1zkwku3O5Ek4MK",
    },
    {
      name: "Database Management System",
      value: "6F3ay2Vc4Kt5u15EwvHy",
    },
    {
      name: "Computer Networks",
      value: "bPZ6KRpI1V1wxrKolv9w",
    },
    {
      name: "Java",
      value: "7yCtIflJmzahNTCW05Ro",
    },
    {
      name: "Aptitude",
      value: "LLsFpj69XzihDhCwb59q",
    },
    {
      name: "General Knowledge",
      value: "rY1PKnOvYWC5eYgWtF1L",
    },
  ];

  const qLOptions = [
    { name: "Level 1", value: "level1" },
    { name: "Level 2", value: "level2" },
    { name: "Level 3", value: "level3" }
  ];

  async function addPracticeItem(e) {
    e.preventDefault();
    const form=document.getElementById("PracticeForm")
    form.reset();
    const { formPracticeTopic,formPracticeSubTopic,formPracticeItem,formPracticeItemLink } = e.target.elements;
    const collRef = collection(db, "contributeQuestionsDB","Practice","Questions");
    
    const payload = {
      topic_name: formPracticeTopic.value.split(",")[0],
      topic_id:formPracticeTopic.value.split(",")[1],
      sub_topic_name: formPracticeSubTopic.value.split(",")[0],
      sub_topic_id: formPracticeTopic.value.split(",")[1],
      title: formPracticeItem.value,
      link: formPracticeItemLink.value
    };
    await addDoc(collRef, payload);
    setShow(true)
        
  }
  async function addTestItem(e) {
    e.preventDefault();
    const form=document.getElementById("PracticeForm")
    form.reset();
    const { formTestTopic,formTestLevel,formTestQuestion,formTestOption1,formTestOption2,formTestOption3,formTestOption4 } = e.target.elements;
    const collRef = collection(db, "contributeQuestionsDB","Test","Questions");
    const payload = {
      topic_id: formTestTopic.value.split(",")[1],
      topic_name:formTestTopic.value.split(",")[0],
      level: formTestLevel.value,
      question: formTestQuestion.value,
      options: [formTestOption1.value,formTestOption2.value,formTestOption3.value,formTestOption4.value]
    };
    await addDoc(collRef, payload);
    setShow(true)
  }

  return (
    <>
      <NavBar />
      <h2 className="subtopic-name">Contribute by adding questions</h2>
      <div className="feedbox mb-5">
        <div className="feedreportbox w-75 mx-auto">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="practice" title="Practice">
              <Form onSubmit={addPracticeItem} id="PracticeForm">
                <div className="mx-auto">
                 
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5 me-4"
                    controlId="formPracticeTopic"
                  >
                    <Form.Label>Topic</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {pTOptions.map(option=>(
                        <option value={[option.name,option.value]}>{option.name}</option>
                      ))}
</Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5"
                    controlId="formPracticeSubTopic"
                  >
                    <Form.Label>Sub-Topic</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {pSTOptions.map(option=>(
                        <option value={[option.name,option.value]}>{option.name}</option>
                      ))}
</Form.Select>
                  </Form.Group>
                </div>
                <Form.Group
                    className=" mb-3  ms-5 me-5"
                    controlId="formPracticeItem"
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title " required />
                  </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formPracticeItemLink"
                >
                  <Form.Label>Link to Material</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter link "
                    required
                  />
                </Form.Group>
                
                <Button
                  className="btn-ctr mx-auto"
                  variant="primary"
                  type="submit"
                >
                  Submit Question
                </Button>
                <Alert className="w-65 mx-auto" variant="success" show={show} onClose={()=>{setShow(false)}} dismissible>Successfully added Question</Alert>
              </Form>
            </Tab>
            <Tab eventKey="test" title="Test">
            <Form onSubmit={addTestItem}>
                <div className="mx-auto">
                 
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5 me-4"
                    controlId="formTestTopic"
                  >
                    <Form.Label>Topic</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {qTOptions.map(option=>(
                        <option value={[option.name,option.value]}>{option.name}</option>
                      ))}
</Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5"
                    controlId="formTestLevel"
                  >
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {qLOptions.map(option=>(
                        <option value={option.value}>{option.name}</option>
                      ))}
</Form.Select>
                  </Form.Group>
                </div>
                <Form.Group
                    className=" mb-3  ms-5 me-5"
                    controlId="formTestQuestion"
                  >
                    <Form.Label>Question</Form.Label>
                    <Form.Control as="textarea"
                rows={2} placeholder="Enter Question to be added " required />
                  </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestOption1"
                >
                  <Form.Label>Option 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option 1 "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestOption2"
                >
                  <Form.Label>Option 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option 2 "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestOption3"
                >
                  <Form.Label>Option 3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option 3 "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestOption4"
                >
                  <Form.Label>Option 4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option 4 "
                    required
                  />
                </Form.Group>
                
                <Button
                  className="btn-ctr mx-auto"
                  variant="primary"
                  type="submit"
                >
                  Submit Question
                </Button>
                <Alert className="w-65 mx-auto" variant="success" show={show} onClose={()=>{setShow(false)}} dismissible>Successfully added Question</Alert>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>

      <Footbar class="footBar-bottom" />
    </>
  );
}
