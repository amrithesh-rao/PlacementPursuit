import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Practice() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
        const colRef = collection(db, "infodb");
        getDocs(colRef)
            .then( snapshot => {
                setTitles(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })))
            })

  }, [titles]);
  
  return (
    <>
      <NavBar />
      {
      titles?.map( title  => (
        <TopicCard title={title.data.title} />
      ))
      }
      <Footbar />
    </>
  );
}
