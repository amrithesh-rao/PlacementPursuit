import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import NavBar from "./NavBar";
import SearchCard from "./SearchCard";
import Footbar from "./Footbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import FeedbackImg from "../img/preview.jpg"
import { useNavigate } from "react-router-dom";
import SelectSearch,{ fuzzySearch } from 'react-select-search';

export default function SearchBar() {
  const [company_name, setCompanyName] = useState([]);
  const options = [
    {name: 'Amazon', value: 'Amazon'},
    {name: 'Cisco', value: 'Cisco'},
    {name: 'Sabre', value: 'Sabre'},
    {name: 'VMware', value: 'VMware'},
    {name: 'Redbus', value: 'Redbus'},
    {name: 'Mercedes Benz', value: 'Mercedes Benz'},
    {name: 'Microfocus', value: 'Microfocus'},
    {name: 'Aurigo', value: 'Aurigo'},
    {name: 'Wdc', value: 'Wdc'},
    {name: 'Hpe', value: 'Hpe'},
    {name: 'Oracle', value: 'Oracle'},
];
const [pt,setPt] = useState("");

  let navigate = useNavigate();
  const colRef = collection(db, "feedbackdb");
  function filter(){
    try{
      getDocs(query(colRef, where("company_name", "==", pt)))
          .then( snapshot => {
            if(snapshot.docs.length == 0)
            alert("No data found");
            else
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
  const handleSubmit = event => {
    event.preventDefault();

    console.log('form submitted ✅');
  };
  console.log(company_name)
  console.log(pt);
    return(
      <>
      <NavBar/>
      {/* <div>
        <img className="feedback-img"  src={FeedbackImg} alt="First slide" />
      </div> */}
      <div>
      <form className='box mt-5' onSubmit={handleSubmit}>
      <SelectSearch
        options={options}
        search
        filterOptions={fuzzySearch}
        onChange={setPt}
        value={pt}
        placeholder="Select company name" />
        <button type='submit' className='search-btn' onClick={filter} >🔍</button>
        
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
