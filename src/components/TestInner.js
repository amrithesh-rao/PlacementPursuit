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
      {
        levels?.map(level => (
        <TopicCard title={level.data.level} id = {level.id}/>
      
      ))}
      <Footbar />
    </>
  );
}