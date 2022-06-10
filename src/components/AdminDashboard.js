import React, { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Form, Button, Modal, Dropdown, Table } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

export default function AdminDashboard() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [qtopic, setQtopic] = useState({
    title: "Data Structures",
    id: "xUddbjWlwvVpbvXn5aHZ",
  });
  const [quizs, setQuiz] = useState([]);
  const [currentUser,setCurrentUser] = useState({});
  const [userSearched,setUserSearched] = useState(false);
  const [avg1, setAvg1] = useState(50);
  const [avg2, setAvg2] = useState(50);
  const [avg3, setAvg3] = useState(50);
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;
  let qc1 = 0;
  let qc2 = 0;
  let qc3 = 0;
  const cssval1 = { "--value": avg1 };
  const cssval2 = { "--value": avg2 };
  const cssval3 = { "--value": avg3 };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [isAdmin, setAdmin] = useState(false);
  if(localStorage.getItem("who")==="Admin"){
    setAdmin(true)
  }
  const { user } = useUserAuth();
  const test = [
    {
      title: "Data Structures",
      id: "xUddbjWlwvVpbvXn5aHZ",
    },
    {
      title: "Operating Systems",
      id: "o3HDaE1zkwku3O5Ek4MK",
    },
    {
      title: "Database Management System",
      id: "6F3ay2Vc4Kt5u15EwvHy",
    },
    {
      title: "Computer Networks",
      id: "bPZ6KRpI1V1wxrKolv9w",
    },
    {
      title: "Java",
      id: "7yCtIflJmzahNTCW05Ro",
    },
    {
      title: "Aptitude",
      id: "LLsFpj69XzihDhCwb59q",
    },
    {
      title: "General Knowledge",
      id: "rY1PKnOvYWC5eYgWtF1L",
    },
  ];


  function getDetails() {
    console.log("called",currentUser?.userName)
    try {
      console.log(qtopic.id);
      const colRef = collection(
        db,
        "userdb",
        currentUser?.id,
        "test",
        qtopic?.id,
        "quiz"
      );
      getDocs(colRef).then((snapshot) => {
        setQuiz(
          snapshot.docs.map((doc) => ({
            sid: doc.id,
            data: doc.data(),
          }))
        );
      });
    } catch (e) {
      console.log(e);
    }
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
            setCurrentUser( snapshot.docs[0].data());
          }

          console.log(currentUser);
        }
      );
    } catch (e) {
      console.log(e);
    }
    
    
  }
  useEffect(()=>{getDetails();},[currentUser])
  useEffect(() => {
    console.log(quizs);
    console.log(total1);
    setAvg1(parseInt((total1 / (qc1 * 15)) * 100));
    setAvg2(parseInt((total2 / (qc2 * 15)) * 100));
    setAvg3(parseInt((total3 / (qc3 * 15)) * 100));
    console.log(avg1);
  }, [quizs]);
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
  quizs.forEach((quiz) => {
    if (quiz.data.level === "Easy") {
      qc1 += 1;
      total1 += parseInt(quiz.data.score);
    } else if (quiz.data.level === "Medium") {
      qc2 += 1;
      total2 += parseInt(quiz.data.score);
    }
    if (quiz.data.level === "Hard") {
      qc3 += 1;
      total3 += parseInt(quiz.data.score);
    }
  });



  // useEffect(() => {
  //   if (user?.email !== undefined) {

  //         getDocs(
  //           query(collection(db, "adminDb"), where("email", "==", user?.email))
  //         ).then((snapshot) => {
  //           if (snapshot.docs.length === 0) {
  //           } else {
  //             setAdmin(true);
  //             console.log(isAdmin);
  //           }
  //         });
  //       }
  // }, [user?.email]);

  return (
  isAdmin?
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
        {currentUser.userName!==undefined?<div className="row">
          <div className="col p-0">
            <div className="row">
              
              <div className="row m-0 p-0">
                <div className="col p-0 test-report m-0 my-3">
                <div className="col-12 level-title h2 mt-2 ">Test</div>
                <div className="row mx-auto">
                <div className="col mx-auto level-title h4">
                  <div>Name:</div><div>{currentUser?.userName}</div></div>
                <div className="col mx-auto level-title h4"><div>USN:</div><div>{currentUser?.usn}</div></div>
              </div>
                  <div className="col-12 level-title ">
                    <div>
                    <Dropdown className="single-line m-2 mb-4">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {qtopic.title}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {test.map((topic) => (
                          <Dropdown.Item
                            onClick={() => {
                              setQtopic(topic);
                            }}
                          >
                            {topic.title}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      className=" mx-auto"
                      variant="primary"
                      onClick={() => getDetails()}
                    >
                      Get
                    </Button>
                    </div>
                    
                  </div>
                  <div className="mx-auto flex-line">
                    <div
                      className=" col-4 first-div progress-circle-single-line mx-auto"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={cssval1}
                    ></div>
                    <div
                      className="col-4  first-div progress-circle-single-line  mx-auto"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={cssval2}
                    ></div>
                    <div
                      className="col-4 first-div progress-circle-single-line mx-auto"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={cssval3}
                    ></div>

                  </div>
                  <div className="row my-2">
                    <div className="col-4 level-title h4 ">Easy</div>
                    <div className="col-4 level-title h4">Medium</div>
                    <div className="col-4 level-title h4">Hard</div>
                  </div>
                </div>
              </div>
              <div>
                <Table striped bordered hover className="mb-5">
                  <thead>
                    <tr>
                      <th>Quiz</th>
                      <th>Level</th>
                      <th>Attempted On</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizs?.map((quizReport) => (
                      <tr>
                        <td>
                          <Button
                            variant="success"
                            onClick={() =>
                              navigate(
                                "/test/" + currentUser?.id + "/report",
                                {
                                  state: {
                                    score: quizReport.data.score,
                                    tq: quizReport.data.tq,
                                    questions: quizReport.data.questions,
                                    answers: quizReport.data.answers,
                                  },
                                }
                              )
                            }
                          >
                            Quiz-{quizs.indexOf(quizReport) + 1}
                          </Button>
                        </td>
                        <td>{quizReport.data.level}</td>
                        <td>{Date(quizReport.data.created?.nanoseconds)}</td>
                        <td>
                          {quizReport.data.score}/{quizReport.data.tq}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>:""}
      </div>

      <Footbar class="footBar-bottom" />
    </>:
    "This feature available to only admin"


  );
 }
                        