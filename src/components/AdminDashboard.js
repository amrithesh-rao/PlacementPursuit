import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase.js";
import {collection,getDocs,query,orderBy} from "firebase/firestore";
import SelectSearch,{ fuzzySearch } from 'react-select-search';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pt,setPt] = useState("");
  useEffect(  () => {
      const collectionRef = collection(db,"userdb");
      getDocs(collectionRef)
        .then((snapshot) => {
            console.log(snapshot.docs)
        setUsers(snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        })));
        
    }).catch(e=>console.log(e));
    
  }, []);
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row px-auto">
        <SelectSearch
        options={users}
        search
        filterOptions={fuzzySearch}
        onChange={setPt}
        value={pt}
        placeholder="Select company name" />
        <button type='submit' className='search-btn'  >🔍</button>
        </div>
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
