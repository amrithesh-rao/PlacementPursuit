import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import SubPracticeCard from "./SubPracticeCard";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SubPractice() {
  const [subtitles, setSubtitles] = useState([]);
  const { id } = useParams();
  const location=useLocation();
  const { title } = location.state;
  useEffect(() => {
    try{
      const colRef = collection(db, "infodb",  id , "subTopic");
      getDocs(query(colRef, orderBy("priority")))
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

}, [id]);
  console.log(id);
  return (
    <>
      <NavBar />
      <h2 className="subtopic-name">{title}</h2>
      <div className="container">
        <div className="row px-auto">
        {
          id === "cY1T9XTiPw5ZeQSajOym" ?
        subtitles?.map( subtitle  => (
          <div className="col-lg-3 p-5 mx-auto">
        <SubPracticeCard subtitle={ subtitle.data.dsaTitle } sid={ subtitle.sid }/>
        </div>
      ))
    :
    subtitles?.map( subtitle  => (
      <div className="col-lg-3 p-5 mx-auto">
    <SubPracticeCard subtitle={ subtitle.data.subTitle } sid={ subtitle.sid }/>
    </div>
  ))
    }
        </div>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
