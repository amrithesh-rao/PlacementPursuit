import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import PracticeCard from "./PracticeCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Practice() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
      try{
        const colRef = collection(db, "infodb");
        getDocs(colRef)
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
      {
      titles?.map( title  => (
        <PracticeCard title={title.data.title} id = {title.id}/>
      ))
      }
      <Footbar />
    </>
  );
}
