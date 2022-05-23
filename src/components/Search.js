import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import NavBar from "./NavBar";
import SearchCard from "./SearchCard";
import Footbar from "./Footbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import FeedbackImg from "../img/preview.jpg"
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [company_name, setCompanyName] = useState([]);
  var pt ="";
  let navigate = useNavigate();
  const colRef = collection(db, "feedbackdb");
  function filter(){
    try{
      getDocs(query(colRef, where("company_name", "==", pt)))
          .then( snapshot => {
              setCompanyName(snapshot.docs.map(doc =>({
                  id: doc.id,
                  data: doc.data()
              })))
          })
    }
    catch(e){
        console.log(e);
    }
    // navigate('/feedback/'+{state:{name:pt}})
  }
  console.log(company_name)
    return(
      <>
      <NavBar/>
      <div>
        <img className="feedback-img"  src={FeedbackImg} alt="First slide" />
      </div>
      <div>
      <form className='box'>
        <input type='text' className='search' onChange={(e)=>{pt = e.target.value}} placeholder='Search Feedback' required/>
        <button type='button' className='search-btn' onClick={filter}>Search</button>
      </form>
    </div>

    <div className="container">
        <div className="row px-auto">
        {
        company_name?.map( title  => (
          <div className="col-lg-3 p-5 mx-auto">
        <SearchCard name={title.data.name} id = {title.id}/>
        </div>
      ))}
        </div>
      </div>
    <Footbar class="footBar-bottom"/>
      </>
    );

};
