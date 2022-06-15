import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase.js";
import {collection,getDocs,query,orderBy} from "firebase/firestore"
import {Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Test() {
  const [titles, setTitles] = useState([]);
  let navigate = useNavigate();
  useEffect(  () => {
      const collectionRef = collection(db,"quiz_questions");
      getDocs(query(collectionRef, orderBy("priority")))
        .then((snapshot) => {
        setTitles(snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        })));
        
    }).catch(e=>console.log(e));
    
    

  }, []);
  return (
    <>
      <NavBar />
      <Button variant="light" onClick={()=>navigate('/home')}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
      <div className="container">
        <div className="row px-auto">
        {
        titles?.map(title => (
          <div className="col-lg-3 p-5 mx-auto">
        <TopicCard title={title.data.subject} id = {title.id}/>
        </div>
      ))}
        </div>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
