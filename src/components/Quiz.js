import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import {collection,getDocs} from "firebase/firestore"
import { useParams } from "react-router-dom";
import NumberBox from "./NumberBox";
import QuizCard from "./QuizCard";
import { sampleSize } from "lodash";
import { Button } from "react-bootstrap";


export default function Quiz() {
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
    console.log("i ran")
    if( document.documentElement.dataset['calcLoaded'] === 'true' ) return;
    console.log("i also ran")
    var time = 5, // your time in seconds here
        display = document.querySelector('#safeTimerDisplay');
    startTimer(time, display);
    document.documentElement.dataset['calcLoaded'] = 'true';
  };



// if( document.readyState === 'loading' ) {
//     document.addEventListener( 'DOMContentLoaded', quizTimer );
// }
// else if( document.readyState === 'interactive' || document.readyState === 'complete' ) {
//     quizTimer();
// }


  const {lid,tid} = useParams();
  const [quiz, setQuiz] = useState([]);
  const [qno, setQno] = useState(0);
  const randomQuestions = useRef([]);
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
      {(quiz.length !== 0) ?
        <QuizCard questionNo={qno + 1} question={randomQuestions.current[qno].data.question} options={randomQuestions.current[qno].data.options}/>
        : ""}
      <div style={{display:"flex", justifyContent: "space-around"}}>
      <Button className="quiz-nav-but m-3" onClick={()=>setQno(qno-1<0?qlength-1:qno-1)}>Previous</Button>
      <Button className="quiz-nav-but m-3" >Save Choice</Button>
      <Button className="quiz-nav-but m-3" onClick={()=>setQno((qno+1)%qlength)}>Next</Button>
      </div>
    <Footbar class="footBar-bottom" />
    </>
  );
}
