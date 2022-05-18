import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import {addDoc, collection,doc,getDocs,serverTimestamp} from "firebase/firestore"
import { useLocation, useParams } from "react-router-dom";
import NumberBox from "./NumberBox";
import { sampleSize } from "lodash";
import { Button,Card,Form,Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";


export default function Quiz() {
  let navigate = useNavigate();
  const location = useLocation();
  const {level} = location.state;
  console.log(level)
  const {user} = useUserAuth();

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
   var counter= setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
  
        if (--timer<= -1) {
          
            clearInterval(counter);
            document.documentElement.dataset['calcLoaded'] = 'false';

            // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        }
    }, 1000);
  }
  
  const quizTimer = function () {
    if( document.documentElement.dataset['calcLoaded'] === 'true' ) return;
    var time = 5, // your time in seconds here
        display = document.querySelector('#safeTimerDisplay');
    startTimer(time, display);
    document.documentElement.dataset['calcLoaded'] = 'true';
  };

  const answers = useRef({});

  const {lid,tid} = useParams();
  const [quiz, setQuiz] = useState([]);
  const [qno, setQno] = useState(0);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const ans= useRef({});

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const randomQuestions = useRef([]);
  const score = useRef(0);
  const qlength=15;
  
  useEffect(  () => {
    try{
    const collectionRef = collection(db,"quiz_questions",tid,"levels",lid,"questions");
    getDocs(collectionRef)
      .then( snapshot => {
      
      setQuiz(snapshot.docs.map(doc => ({
          data: doc.data()
      })))
  });
   

  }
  catch(e){
    console.log(e);
}  
    
 

  }, []);
  quiz.length!==0?quizTimer():console.log()
  if(randomQuestions.current.length===0){
    randomQuestions.current=sampleSize(quiz,qlength);
    
  }
  const setQuizReport = async ()=>{
    const collRef = collection(
      db,"userdb",user?.uid,"test",tid,"quiz"
    );
    const payload = {
      score:score.current,
      tq:qlength,
      questions:randomQuestions.current,
      answers:answers.current,
      level:level,
      created:serverTimestamp()

    };
    await addDoc(collRef,payload);
  }
  function saveAns(e){
    e.preventDefault();
    handleShow1();
    const {selectOptions,questionNo}=e.target.elements;
    ans.current={
      qno:questionNo.value,
      option:selectOptions.value
    }
    

  }
  function confirmAns(e){
    handleClose1();
    answers.current[ans.current.qno.toString()]=ans.current.option;
    

  }
  function endTest(){
    
    for(let x in answers.current){
      if(answers.current[x]===randomQuestions.current[x-1].data.answer){
        score.current=score.current+1;
      }
      
    }
    setQuizReport();
    handleClose2();
    navigate('/test/'+tid+'/report',{state:{score:score.current,tq:qlength,questions:randomQuestions.current,answers:answers.current}})
  }
  
  return (
    <>
      <NavBar  />
      <div id="safeTimer" className="p-2 position-absolute end-0">
        <h6>Time remaining</h6>
        <p id="safeTimerDisplay"></p>
      </div>
      <h2 className="m-3">Quiz-1</h2>

  

      {randomQuestions.current.map(questions => (
        <NumberBox questionNo={randomQuestions.current.indexOf(questions) + 1} handleClick={() => setQno(randomQuestions.current.indexOf(questions))} />
      ))}
      {randomQuestions.current.length!==0?
        <>
        <Card className=" quiz-card mx-auto">
        <Card.Body>
          <Card.Title>Q{qno + 1} : {randomQuestions.current[qno].data.question}</Card.Title>
          <Form onSubmit={saveAns} id="ansForm">
          <Card.Text>
            {randomQuestions.current[qno].data.options.map(option=>
            <Form.Check type={"radio"}
            id={randomQuestions.current[qno].data.options.indexOf(option)+1}
            label={option}
            value={option}
            name={"selectOptions"}/>)}
          </Card.Text>
          <input type="hidden" name={"questionNo"} value={qno + 1}></input>
          <Button variant="primary" type="submit">Save Choice</Button>
          
          <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Save Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Save this choice!You can come back later and change it.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmAns}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </Form>
          
        </Card.Body>
      </Card>
      </>:""}
        
      
      <div style={{display:"flex", justifyContent: "space-around"}}>
      <Button className="quiz-nav-but m-3" onClick={()=>setQno(qno-1<0?qlength-1:qno-1)}>Previous</Button>
      <Button className="quiz-nav-but m-3" onClick={handleShow2} >Submit</Button>
      <Button className="quiz-nav-but m-3" onClick={()=>setQno((qno+1)%qlength)}>Next</Button>
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>End Test?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Finish and submit answers?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={endTest}>
            Submit Test
          </Button>
        </Modal.Footer>
      </Modal>
    <Footbar class="footBar-bottom" />
    </>
  );
}
