import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import SubPracticeCard from "./SubPracticeCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function SubPractice() {
  const [subtitles, setSubtitles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    try{
      const colRef = collection(db, "infodb", id ,"subtitle");
      getDocs(colRef)
          .then( snapshot => {
              setSubtitles(snapshot.docs.map(doc =>({
                  sid: doc.id,
                  data: doc.data()
              })))
          })
    }
    catch(e){
        console.log(e);
    }
    console.log();
    console.log();
      

}, []);
  
  return (
    <>
      <NavBar />
      {
      subtitles?.map( subtitle  => (
        <SubPracticeCard subtitle={ subtitle.data.title } sid={ subtitle.sid }/>
      ))
      }
      <Footbar />
    </>
  );
}
