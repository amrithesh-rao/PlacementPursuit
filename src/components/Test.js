import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase.js";
import {collection,getDocs,query,orderBy} from "firebase/firestore"

export default function Test() {
  const [titles, setTitles] = useState([]);
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
      {
        titles?.map(title => (
        <TopicCard title={title.data.subject} id = {title.id}/>
      
      ))}
      <Footbar />
    </>
  );
}
