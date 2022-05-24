import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import './Search.js';
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";


export default function FeedbackReport(){
  const [feedbackInfo, setFeedbackInfo] = useState({});
  const { fid } = useParams();
  // let navigate = useNavigate();

  useEffect(() => {


    try{
      async function getDocumentData(){

        const docRef = doc(db, "feedbackdb",  fid );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setFeedbackInfo({
            name : docSnap.data().name,
            company_name: docSnap.data().company_name,
            ctc: docSnap.data().ctc,
            experience:docSnap.data().experience,
            role :docSnap.data().role
          });
        } else {
          console.log("No such document!");
        }
      }
      getDocumentData();

      // getDoc(docRef)
      //     .then( snapshot => {
      //         setSubtitles(snapshot.docs.map(doc =>({
      //             fid: doc.id,
      //             data: doc.data()
      //         })))
      //     })
    }
    catch(e){
        console.log(e);
    }   

}, []);
console.log(fid);
console.log(feedbackInfo);
return(
  <>
  <NavBar/>
  <div className="feedbox" >
        
        <div className="feedreportbox">
            <h2> Name : { feedbackInfo.name } </h2>
            <h3> Company Name :{ feedbackInfo.company_name } </h3>
            <h3> Role : { feedbackInfo.role } </h3>
            <h3>CTC : { feedbackInfo.ctc } </h3>
            <h6> Experience : { feedbackInfo.experience } </h6>
        </div>
  </div>
      
  <Footbar class="footBar-bottom"/>
  </>
)
}