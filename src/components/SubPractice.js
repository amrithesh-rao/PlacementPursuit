import React, { useEffect, useState, useParams } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import SubPracticeCard from "./SubPracticeCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SubPractice() {
  const [subtitles, setSubtitles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    try{
      const colRef = collection(db, "infodb");
      getDocs(colRef)
          .then( snapshot => {
              setSubtitles(snapshot.docs.map(doc =>({
                  id: doc.id,
                  data: doc.data()
              })))
          })
    }
    catch(e){
        console.log(e);
    }
      

}, []);
  
  return (
    <>
      <NavBar />
      {
      subtitles?.map( subtitle  => (
        <SubPracticeCard subtitle={ subtitle.data.title } id={ subtitle.id }/>
      ))
      }
      <Footbar />
    </>
  );
}
