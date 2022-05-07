import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import {collection,getDocs} from "firebase/firestore"
import { useParams } from "react-router-dom";
import NumberBox from "./NumberBox";
import QuizCard from "./QuizCard";

export default function Quiz() {
  const {lid,tid} = useParams();
  const [quiz, setQuiz] = useState([]);
  const [qno, setQno] = useState(1);
  
  useEffect(  () => {
    try{
    const collectionRef = collection(db,"quiz_questions",tid,"levels",lid,"questions");
    getDocs(collectionRef)
      .then( snapshot => {
      
      setQuiz(snapshot.docs.map(doc => ({
          data: doc.data()
      })))
  })

  }
  catch(e){
    console.log(e);
}  
    
    

  }, [tid,lid]);
  console.log(quiz);
  // console.log(values);
   console.log();
  return (
    <>
      <NavBar />
      {
        quiz.map(questions => (
            <NumberBox questionNo={quiz.indexOf(questions)+1} />
      ))}
      {
      (quiz.length !==0)?
      <QuizCard questionNo={qno} question={quiz[qno].data.question} options={quiz[qno].data.options} />  
      :""
      }

      <Footbar class="footBar"/> 
    </>
  );
}
