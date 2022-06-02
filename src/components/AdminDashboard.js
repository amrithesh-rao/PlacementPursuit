import React, { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import { collection, getDocs, query, where,orderBy } from "firebase/firestore";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [ptopic,setPtopic] = useState({title:"Data Structure And Algorithms"});
  const [psub,setPsub] = useState({subTitle:"Arrays"});
  const [topics,setTopics] = useState([]);
  const [subtopics,setSubtopics] = useState([]);
  const [quiz,setQuiz]=useState([]);
  const currentUser = useRef({});
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  
function getPractice(){
  const colRef=collection(db,'userdb',currentUser.current.id,"practice");
  
}
// useEffect(()=>{getSubTopics()},[ptopic, topics, subtopics])
function getSubTopics(){
  console.log("asdeasdadfdgfdgdfgfdgdfgfdgdfgsdasd")
  try{
    const colRef = collection(db, "infodb",  ptopic?.id , "subTopic");
    getDocs(query(colRef, orderBy("priority")))
        .then( snapshot => {
            setSubtopics(snapshot.docs.map(doc =>({
                sid: doc.id,
                data: doc.data(),
            })))
         })

    }

  catch(e){
      console.log(e);
  }  
  console.log(ptopic.id)
}

  function searchUSN(e) {
    e.preventDefault();
    const { formUSN } = e.target.elements;
    const colRef = collection(db, "userdb");
    try {
      getDocs(query(colRef, where("usn", "==", formUSN.value))).then(
        (snapshot) => {
          if (snapshot.docs.length === 0) handleShow1();
          else {
            currentUser.current = snapshot.docs[0].data();
          }

          console.log(currentUser.current);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  function getDetails(){
    
  }
  useEffect(()=>{
    try{
      const colRef = collection(db, "infodb");
      getDocs(query(colRef,orderBy("priority")))
          .then( snapshot => {
              setTopics(snapshot.docs.map(doc =>({
                  id: doc.id,
                  data: doc.data()
              })))
          })
    }
    catch(e){
        console.log(e);
    }
    try{
      const colRef = collection(db, "infodb",  "cY1T9XTiPw5ZeQSajOym" , "subTopic");
      getDocs(query(colRef, orderBy("priority")))
          .then( snapshot => {
              setSubtopics(snapshot.docs.map(doc =>({
                  sid: doc.id,
                  data: doc.data(),
              })))
           })

      }

    catch(e){
        console.log(e);
    }  
  },[])
  useEffect(() => {
    const collectionRef = collection(db, "userdb");
    getDocs(collectionRef)
      .then((snapshot) => {
        console.log(snapshot.docs[0].data());
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(topics,subtopics)
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row px-auto ">
          <div>
            <Form onSubmit={searchUSN}>
              <div className="mx-auto">
                <Form.Group
                  className="mt-3 mb-3 w-25 mx-auto"
                  controlId="formUSN"
                >
                  <Form.Control type="text" placeholder="Search USN" />
                </Form.Group>

                <Button
                  className="btn-ctr mx-auto"
                  variant="primary"
                  type="submit"
                >
                  Search
                </Button>
              </div>
            </Form>
            <Modal show={show1} onHide={handleClose1} centered={true}>
              <Modal.Header closeButton>
                <Modal.Title>Sorry!!</Modal.Title>
              </Modal.Header>
              <Modal.Body>No record found with that USN.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary">Okay</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="row mx-auto">
                <div className="col mx-auto">Vishal Rajkumar Naik</div>
              </div>
              <div className="row">
                <div className="col practice-report">
                  <div className="row">
                  Practice
                  </div>
                  
                  <Dropdown className="single-line m-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {ptopic.title}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {
                        topics?.map(topic=>(
                          <Dropdown.Item onClick={()=>{setPtopic(topic.data);getSubTopics()}}>{topic.data.title}</Dropdown.Item>
                        ))
                      }
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="single-line m-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                     {psub.subTitle}
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                    {
                        subtopics?.map(subtopic=>(
                          <Dropdown.Item onClick={()=>{setPsub(subtopic.data)}} >{subtopic.data.subTitle}</Dropdown.Item>
                        ))
                        
                        
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col test-report">Test
                <div>
                <Dropdown className="single-line m-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {ptopic.data?.title}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {
                        topics?.map(topic=>(
                          <Dropdown.Item onClick={()=>{console.log("asdeasdasdasd");setPtopic(topic);getSubTopics()}}>{topic.data.title}</Dropdown.Item>
                        ))
                      }
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footbar class="footBar-bottom" />
    </>
  );
}
