import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import PracticeCard from "./PracticeCard";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Practice() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
      try{
        const colRef = collection(db, "infodb");
        getDocs(query(colRef, orderBy("priority")))
            .then( snapshot => {
                setTitles(snapshot.docs.map(doc =>({
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
      <div className="container">
        <div className="row px-auto">
        {
        titles?.map( title  => (
          <div className="col-lg-3 p-5 mx-auto">
        <PracticeCard title={title.data.title} id = {title.id}/>
        </div>
      ))}
        </div>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
