import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import {collection,getDoc, query, orderBy, where} from "firebase/firestore"
import { useParams } from "react-router-dom";
import NumberBox from "./NumberBox";
import QuizCard from "./QuizCard";

export default function Quiz() {
  const {lid,tid} = useParams();
  const [quiz, setQuiz] = useState({});
  const [qno, setQno] = useState(3);
  
  useEffect(  () => {
    try{
    const collectionRef = collection(db,"quiz_questions",tid,"levels",lid,"questions");
    getDoc(query(collectionRef, where("questionNo", "==", qno )))
      .then( snapshot => {
      setQuiz(
          snapshot.data()
      )
  })
  }
  catch(e){
    console.log(e);
}  
    
    

  });
  console.log(quiz,tid,lid,qno);
   console.log(quiz[qno].data);
   console.log();
  return (
    <>
      {/* <NavBar />
      {
        quiz?.map(questions => (
            <NumberBox questionNo={quiz.indexOf(questions)+1} />
            
      
      ))}*/}
      {/* <QuizCard questionNo={qno} question={quiz[qno].data.question} options={quiz[qno].data.options} /> */}
      <Footbar />  
    </>
  );
}
