import React, { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Form, Button, Modal, Tabs, Tab, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function Contribute() {
  const { user } = useUserAuth();
  let navigate = useNavigate();
  const [{ topic, subTopic }, setData] = useState({
    topic: "Operating System",
    subTopic: "Threads",
  });
  const [{ qtopic, level }, setData1] = useState({
    qtopic: "Data Structures",
    level: "Easy",
  });
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [key, setKey] = useState("practice");
  const [isAlumni,setAlumni] = useState(false);
  


  const pTOptions = [
    {
      name: "Operating System",
      value: "6oDOgLyviDBtuKKgsYKw",
      subTopics: [
        { name: "Threads", value: "53gMjRLwRFpR8LIu3Elb" },
        { name: "CPU Scheduling", value: "9Bc5mCAopscNF9jI8wB7" },
        { name: "Memeory Management", value: "A2d3yraHIZ7b5cjqbr1r" },
        { name: "File Management", value: "QfMTZVGscXmEs1jkJGwV" },
        { name: "Process Synchronisation", value: "eUEcKeKmHErLssdxuFRE" },
        { name: "Deadlock", value: "vqwL6n3hAlroxmplgfW0" },
      ],
    },
    {
      name: "Data Structure And Algorithms",
      value: "cY1T9XTiPw5ZeQSajOym",
      subTopics: [
        { name: "Greedy", value: "3EM6cIXWoqrvTW8Nx2OV" },
        { name: "Matrix", value: "AfpQPr3F97q6xhIlrXbI" },
        { name: "Binary Search Tree", value: "Cg2jkqpiZ8jqdDNP86l4" },
        { name: "Linked List", value: "CrnHEeGBA508Y2qd7qPa" },
        { name: "BackTracking", value: "Ko7p39Aax3ITXPmK9icY" },
        { name: "Graph", value: "MFV0lN314fXEkKQoOIzs" },
        { name: "Trie", value: "XNWKSZnPbUIMjPmQ5lTx" },
        { name: "Bit Manipulation", value: "ea2eYsYG7vs0NL2MECDL" },
        { name: "Binary Tree", value: "mEUml2qAbr6Is677Fxb7" },
        { name: "Stacks & Queues", value: "mFjdnAOUAyDPwzSkgzGS" },
        { name: "Dynamic Programming", value: "nRuDIiDvDzVfYkLGvuVn" },
        { name: "Arrays", value: "rxwsS9K6P6CbnxH8Dbg5" },
        { name: "String", value: "uSufMitdvEC1cVPQ0NCS" },
        { name: "Searching and Sorting", value: "ueEf1bRQNtdUCPnqiM9w" },
        { name: "Heap", value: "wx6y4MLw58R7N3CjzfYO" },
      ],
    },
    {
      name: "Networking",
      value: "spNoWcCvYPVbVJYz677o",
      subTopics: [
        { name: "Application Layer", value: "3NzrNBibYBDdNlXC5LX7" },
        { name: "Data Link Layer", value: "8RT7N0ADP8wY5zexA1LD" },
        { name: "Transport Layer", value: "Z8IdhFGHzqHUtHGFovUc" },
        { name: "Network Layer", value: "nrpjTNxRMGN7mARRYJIh" },
        { name: "Network Security", value: "rVCb0uuVwfmITF3JyUZz" },
      ],
    },
    {
      name: "DBMS",
      value: "xhEdXgM9qAYBGA5OBXCU",
      subTopics: [
        { name: "Transaction", value: "6sWI6c8pb1yL157QWVJO" },
        { name: "Relational Algebra", value: "BDmhqpA9vKfaKjHgRyl9" },
        { name: "SQL Queries", value: "hvOw9kkoYYcDqi8O9YZe" },
        { name: "Normalization", value: "iUy6yenXDKQ0NDTWDDYu" },
        { name: "Functional Dependency", value: "kv3YEWIinyf6JJ3Q348l" },
      ],
    },
  ];

  const qTOptions = [
    {
      name: "Data Structures",
      value: "xUddbjWlwvVpbvXn5aHZ",
      levels: [
        { name: "Easy", value: "XTIGMIUmTgWBf96XY33L" },
        { name: "Medium", value: "dhw0ygeUP5nj8FQu8DcB" },
        { name: "Hard", value: "Uh3Q8wgYlTREGo41cTM9" },
      ],
    },
    {
      name: "Operating Systems",
      value: "o3HDaE1zkwku3O5Ek4MK",
      levels: [
        { name: "Easy", value: "Fh3zuUZ8NmTYndxypKdh" },
        { name: "Medium", value: "YCSB7OxemiBfXV8qzdcT" },
        { name: "Hard", value: "jFpPsTkLu7gN3jL7pt50" },
      ],
    },
    {
      name: "Database Management System",
      value: "6F3ay2Vc4Kt5u15EwvHy",
      levels: [
        { name: "Easy", value: "B9V3TKLDI7WT1DEoX8ov" },
        { name: "Medium", value: "tFbFkFMq1LB6MocY4ctM" },
        { name: "Hard", value: "IIe19Y8jfUlXmUverzq7" },
      ],
    },
    {
      name: "Computer Networks",
      value: "bPZ6KRpI1V1wxrKolv9w",
      levels: [
        { name: "Easy", value: "Q3rGJCbsVLYiGHsN5CVc" },
        { name: "Medium", value: "ds3miQu9jJkgmhyVViL3" },
        { name: "Hard", value: "UjShfMl2V7FN2DInqI6r" },
      ],
    },
    {
      name: "Java",
      value: "7yCtIflJmzahNTCW05Ro",
      levels: [
        { name: "Easy", value: "eKe3qv0fQfWh0a4YEoSc" },
        { name: "Medium", value: "EyLF8mxijeIKf4IKMc6K" },
        { name: "Hard", value: "DrOYCy251WQRzzU0jDOm" },
      ],
    },
    {
      name: "Aptitude",
      value: "LLsFpj69XzihDhCwb59q",
      levels: [
        { name: "Easy", value: "EszGi0yrimblQK3l3kps" },
        { name: "Medium", value: "IiZDBr9GWzrDupU3O1ov" },
        { name: "Hard", value: "PaQTmhu2v34egopBTcIV" },
      ],
    },
    {
      name: "General Knowledge",
      value: "rY1PKnOvYWC5eYgWtF1L",
      levels: [{ name: "Easy", value: "0QT8D7xT5armmBvh319g" }],
    },
  ];

  const topics = pTOptions.map((option) => (
    <option key={option.name} value={option.name}>
      {option.name}
    </option>
  ));
  const subTopics = pTOptions
    .find((item) => item.name === topic)
    ?.subTopics.map((option) => (
      <option key={option.name} value={option.name}>
        {option.name}
      </option>
    ));

  function handleTopicChange(event) {
    setData((data) => ({ subTopic: "", topic: event.target.value }));
  }

  function handleSubTopicChange(event) {
    setData((data) => ({ ...data, subTopic: event.target.value }));
  }

  const qtopics = qTOptions.map((option) => (
    <option key={option.name} value={option.name}>
      {option.name}
    </option>
  ));
  const levels = qTOptions
    .find((item) => item.name === qtopic)
    ?.levels.map((option) => (
      <option key={option.name} value={option.name}>
        {option.name}
      </option>
    ));

  function handleQTopicChange(event) {
    setData1((data) => ({ ...data, qtopic: event.target.value }));
    console.log(qTOptions.find((item) => item.name === qtopic));
  }

  function handleLevelChange(event) {
    setData1((data) => ({ ...data, level: event.target.value }));
  }

  async function addPracticeItem(e) {
    e.preventDefault();
    if (
      pTOptions
        .find((item) => item.name === topic)
        .subTopics.find((st) => st.name === subTopic) !== undefined
    ) {
      setShow1(false);
      const form = document.getElementById("PracticeForm");
      form.reset();
      const collRef = collection(
        db,
        "contributeQuestionsDB",
        "Practice",
        "Questions"
      );
      const payload = {
        topic_name: pTOptions.find((item) => item.name === topic).name,
        topic_id: pTOptions.find((item) => item.name === topic).value,
        sub_topic_name: pTOptions
          .find((item) => item.name === topic)
          .subTopics.find((st) => st.name === subTopic).name,
        sub_topic_id: pTOptions
          .find((item) => item.name === topic)
          .subTopics.find((st) => st.name === subTopic).value,
        title: title,
        link: link,
        user_email: user?.email,
      };
      await addDoc(collRef, payload);
      setShow(true);
    } else {
      setShow1(true);
    }
  }
  async function addTestItem(e) {
    e.preventDefault();
    const {
      formTestQuestion,
      formTestOption1,
      formTestOption2,
      formTestOption3,
      formTestOption4,
      formTestAnswer
    } = e.target.elements;

    const collRef = collection(
      db,
      "contributeQuestionsDB",
      "Test",
      "Questions"
    );
    console.log(qTOptions.find((item) => item.name === qtopic));
    console.log(qTOptions.find((item) => item.name === qtopic).levels);
    const payload = {
      topic_id: qTOptions.find((item) => item.name === qtopic).value,
      topic_name: qTOptions.find((item) => item.name === qtopic).name,
      level_id: qTOptions
        .find((item) => item.name === qtopic)
        .levels.find((l) => l.name === level)?.value,
      level_name: qTOptions
        .find((item) => item.name === qtopic)
        .levels.find((l) => l.name === level)?.name,
      question: formTestQuestion.value,
      options: [
        formTestOption1.value,
        formTestOption2.value,
        formTestOption3.value,
        formTestOption4.value,
      ],
      answer:formTestAnswer.value,
      user_email: user?.email,
    };
    await addDoc(collRef, payload);
    const form = document.getElementById("TestForm");
    form.reset();
    setShow(true);
  }
  useEffect(()=>{
    if(localStorage.getItem("who")==="Alumni"){
      setAlumni(true);
    }
  },[])
  return (
    isAlumni?
    <>
      <NavBar />
      <Button variant="light" onClick={()=>navigate('/home')}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
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
                    <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('code-commit')}/> Topic</Form.Label>
                    <Form.Select
                      value={topic}
                      aria-label="Default select example"
                      onChange={handleTopicChange}
                    >
                      {topics}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5"
                    controlId="formPracticeSubTopic"
                  >
                    <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('code-merge')}/> Sub-Topic</Form.Label>
                    <Form.Select
                      value={subTopic}
                      aria-label="Default select example"
                      onChange={handleSubTopicChange}
                    >
                      {subTopics}
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formPracticeItem"
                >
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('feather-pointed')}/> Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(q) => setTitle(q.target.value)}
                    placeholder="Enter Title "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formPracticeItemLink"
                >
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('link')}/> Link to Material</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(q) => setLink(q.target.value)}
                    placeholder="Enter link "
                    required
                  />
                </Form.Group>

                <Button
                  className="btn-ctr mx-auto"
                  variant="primary"
                  type="submit"
                >
                  <FontAwesomeIcon icon={solid('paper-plane')}/> Submit Question
                </Button>
                <Alert
                  className="w-65 mx-auto"
                  variant="success"
                  show={show}
                  onClose={() => {
                    setShow(false);
                  }}
                  dismissible
                >
                  Successfully added Question
                </Alert>
                <Alert
                  className="w-65 mx-auto"
                  variant="danger"
                  show={show1}
                  onClose={() => {
                    setShow1(false);
                  }}
                  dismissible
                >
                  Please select valid subtopic!!
                </Alert>
              </Form>
            </Tab>
            <Tab eventKey="test" title="Test">
              <Form onSubmit={addTestItem} id="TestForm">
                <div className="mx-auto">
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5 me-4"
                    controlId="formTestTopic"
                  >
                    <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('code-commit')}/> Topic</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleQTopicChange}
                    >
                      {qtopics}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mt-3 mb-3 w-25 single-line ms-5"
                    controlId="formTestLevel"
                  >
                    <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('code-merge')}/> Level</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleLevelChange}
                    >
                      {levels}
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestQuestion"
                >
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('clipboard-question')}/> Question</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter Question to be added "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestOption1"
                >
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('map-pin')}/> Option 1</Form.Label>
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
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('map-pin')}/> Option 2</Form.Label>
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
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('map-pin')}/> Option 3</Form.Label>
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
                  <Form.Label className="bold-font"><FontAwesomeIcon icon={solid('map-pin')}/> Option 4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option 4 "
                    required
                  />
                </Form.Group>
                <Form.Group
                  className=" mb-3  ms-5 me-5"
                  controlId="formTestAnswer"
                >
                  <Form.Label className="bold-font answer-label"><FontAwesomeIcon icon={solid('circle-check')}/> Answer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option answer "
                    required
                  />
                </Form.Group>

                <Button
                  className="btn-ctr mx-auto"
                  variant="primary"
                  type="submit"
                >
                  <FontAwesomeIcon icon={solid('paper-plane')}/> Submit Question
                </Button>
                <Alert
                  className="w-65 mx-auto"
                  variant="success"
                  show={show}
                  onClose={() => {
                    setShow(false);
                  }}
                  dismissible
                >
                  Successfully added Question
                </Alert>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>

      <Footbar class="footBar-bottom" />
    </>:<Modal show={true} onHide={handleClose2} centered={true} backdrop="static">
      
      <Modal.Header >
        <Modal.Title>Sorry!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      You are not authorized to perform this action.

        
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>navigate(-1)}>
          Go Back
        </Button>
        
      </Modal.Footer>
     
    </Modal>
  );
}
