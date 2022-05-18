import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import './Search.js';
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function FeedbackReport(){
  const [subtitles, setSubtitles] = useState([]);
  const { fid } = useParams();

  useEffect(() => {
    try{
      const colRef = collection(db, "feedbackdb",  fid );
      getDocs(query(colRef,orderBy("priority")))
          .then( snapshot => {
              setSubtitles(snapshot.docs.map(doc =>({
                  fid: doc.id,
                  data: doc.data()
              })))
          })
    }
    catch(e){
        console.log(e);
    }   

}, [fid]);
console.log(fid);
return(
  <>
  <NavBar/>
  <div className="container">
        <div className="row px-auto">
        {
        subtitles?.map( subtitle  => (
          <div className="col-lg-3 p-5 mx-auto">
            {/* Need to display data here */}
        </div>
      ))}
        </div>
      </div>
  <Footbar class="footBar-bottom"/>
  </>
)
}