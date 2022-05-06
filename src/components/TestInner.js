import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase.js";
import {collection,getDocs, orderBy, query} from "firebase/firestore"
import { useParams } from "react-router-dom";

export default function TestInner1() {
    const [levels, setLevels] = useState([]);
    // const [subTopics, setSupTopics] = useState([]);
    const {id} = useParams();
    console.log(id)

  useEffect(  () => {

        const collectionRef = collection(db,"quiz_questions",id,"levels")
      getDocs(query(collectionRef, orderBy("priority")))
        .then((snapshot) => {
        setLevels(snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        })));
        
        }).catch(e=>console.log(e));
      
    
    

  }, [id]);
  console.log(levels)
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row px-auto">
        {
        levels?.map(level => (
          <div className="col-lg-3 p-5 mx-auto">
        <TopicCard title={level.data.level} id = {level.id}/>
        </div>
      ))}
        </div>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}