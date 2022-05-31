import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import PracticeCard from "./PracticeCard";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import SelectSearch from "react-select-search";

export default function Practice() {
  const [titles, setTitles] = useState([]);
  const [dept, setDept] = useState("CS");
  useEffect(() => {
      try{
        const colRef = collection(db, "infodb");
        getDocs(query(colRef,where("dept","array-contains",dept),orderBy("priority")))
            .then( snapshot => {
              if(snapshot.docs.length === 0){
                alert("Yet to add")
                setTitles([])
              }
              else
                setTitles(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })))
            })
      }
      catch(e){
          console.log(e);
      }
        
  }, [dept]);

  return (
    <>
      <NavBar />
      <div className="container"> 
      <SelectSearch
      className="select-search dept-search"
       options={[
           { value: 'CS', name: 'Computer Science' },
           { value: 'EC', name: 'Electronics and Communication' },
           { value: 'IS', name: 'Information Science' },
           { value: 'MECH', name: 'Mechanical' },
       ]}
       onChange={setDept}
       value={dept}
       />
       </div>
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
