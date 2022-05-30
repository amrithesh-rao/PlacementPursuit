import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase.js";
import {collection,getDocs, orderBy, query} from "firebase/firestore"
import { useParams } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TestInner() {
    const [levels, setLevels] = useState([]);
    const [quizReports,setQuizReports] = useState([]);
    const {id} = useParams();
    let navigate = useNavigate();
    const {user} = useUserAuth();
    const location=useLocation();

    const { testHeading } = location.state;
    
    console.log(user)
    console.log(id)

    
    

  useEffect(  () => {

    const collectionRef1 = collection(db,"quiz_questions",id,"levels")
    getDocs(query(collectionRef1, orderBy("priority")))
      .then((snapshot) => {
      setLevels(snapshot.docs.map(doc => ({
          id:doc.id,
          data:doc.data()
      })));
    }).catch(e=>console.log(e));


      console.log(user)
    if(quizReports?.length===0 && user.uid!==undefined){
      const collectionRef2 = collection(db,"userdb",user?.uid,"test",id,"quiz")
      getDocs(query(collectionRef2,orderBy("created")))
        .then((snapshot) => {
        setQuizReports(snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        })));

        
        }).catch(e=>console.log(e));
    } 
    

  }, [quizReports.length,id,user?.uid]);
  console.log(quizReports)
  return (
    <>
      <NavBar />
      <h2 className="subtopic-name">{testHeading}</h2>
      <div className="container">
        <div className="row px-auto">
        {
        levels?.map(level => (
          <div className="col-lg-3 p-5 mx-auto">
        <TopicCard title={level.data.level} id = {level.id} quizNo={quizReports.length+1} />
        </div>
      ))}
        </div>
      </div>
      <div>
      <Table striped bordered hover className="mb-5" >
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Level</th>
            <th>Attempted On</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>

        {quizReports?.map((quizReport) => (
                    <tr>
        <td><Button  variant="success" onClick={()=>navigate('/test/'+id+'/report',{state:{score:quizReport.data.score,tq:quizReport.data.tq,questions:quizReport.data.questions,answers:quizReport.data.answers}})}>Quiz-{quizReports.indexOf(quizReport)+1}</Button></td>
        <td>{quizReport.data.level}</td>
        <td>{Date(quizReport.data.created?.nanoseconds)}</td>
        <td>{quizReport.data.score}/{quizReport.data.tq}</td>
        </tr>
      ))}

        </tbody>
      </Table>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}