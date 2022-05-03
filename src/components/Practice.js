import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import TopicCard from "./TopicCard";
import { db } from "../firebase.js";

export default function Practice() {
  const [titles, setTitles] = useState({});

  useEffect(  () => {
      console.log("dsfdf");
    db.collection('infodb').onsnapshot((snapshot)=>{
        setTitles(snapshot.docs.map(doc => doc.data()))
        console.log(titles)
    })

    // const snapshot = db.collection('users').get();
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
    // });
  }, [titles]);

  return (
    <>
      <NavBar />
      {/* {titles.map(({ title }) => (
        <TopicCard title={title} />
      ))} */}
      <Footbar />
    </>
  );
}
