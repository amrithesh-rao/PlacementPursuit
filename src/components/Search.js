import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import NavBar from "./NavBar";
import SearchCard from "./SearchCard";
import Footbar from "./Footbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import FeedbackImg from "../img/preview.jpg"
import { useNavigate } from "react-router-dom";
import SelectSearch,{ fuzzySearch } from 'react-select-search';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


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
    {name: 'JP Morgan', value: 'JP Morgan'},
    {name: 'Zscalar',value: 'Zscalar'},
    {name: 'Fidelity',value: 'Fidelity'},
    {name: 'Qualcomm',value: 'Qualcomm'},
    {name: 'Deloitte',value: 'Deloitte'},
    {name: 'Thoughtworks',value: 'Thoughtworks'},
    {name: 'Infosys', value: 'Infosys'},
    {name: 'Cashfree', value: 'Cashfree'},
    {name: 'Amagi', value: 'Amagi'},
    {name: 'Dxc', value: 'Dxc'},
    {name: 'Cimpress', value: 'Cimpress'},
    {name: 'Lam Research', value: 'Lam Research'},
    {name: 'Visa', value: 'Visa'},
    {name: 'Sap Lab', value: 'Sap Lab'},
    {name: 'Samsung', value: 'Samsung'},
    {name: 'Optum', value: 'Optum'},
    {name: 'Applied Materials', value: 'Applied Materials'},
    {name: 'Intel', value: 'Intel'},
    {name: 'Mitel', value: 'Mitel'},
    {name: 'Aris Global', value: 'Aris Global'},
    {name: 'Microchip', value: 'Microchip'},
    {name: 'Games 24*7', value: 'Games 24*7'},
    {name: 'Max Linear', value: 'Max Linear'},
    {name: 'Juniper Networks', value: 'Juniper Networks'},
    {name: 'Nokia', value: 'Nokia'},
    {name: 'Clumio Technologies', value: 'Clumio Technologies'},
    {name: 'Juspay', value: 'Juspay'},
    {name: 'Byjus', value: 'Byjus'},
    {name: 'Hcl', value: 'Hcl'},
    {name: 'Cognizant', value: 'Cognizant'},
    {name: 'Tavant', value: 'Tavant'},
    {name: 'Toshibha', value: 'Toshibha'},
    {name: 'Wipro', value: 'Wipro'},
    {name: 'Toyota', value: 'Toyota'},
    {name: 'TE Connectivity', value: 'TE Connectivity'},
    {name: 'Sandvine', value: 'Sandvine'},
    {name: 'TCS', value: 'TCS'},
    {name: 'Logmein', value: 'Logmein'},
    {name: 'Accenture', value: 'Accenture'},
    {name: 'Danske IT ', value: 'Danske IT '},
    {name: 'Dell', value: 'Dell'},
    {name: 'Volvo', value: 'Volvo'},
    {name: 'Philips', value: 'Philips'},   
    {name: 'Avaya', value: 'Avaya'},
    {name: 'Publicis Sapient ', value: 'Publicis Sapient '},
    {name: 'Bosch', value: 'Bosch'},
    {name: 'Schneider Electric', value: 'Schneider Electric'},
    {name: 'Informatica', value: 'Informatica'},
    {name: 'IBM', value: 'IBM'},
    {name: 'Kantar', value: 'Kantar'},
    {name: 'Tech Mahindra', value: 'Tech Mahindra'},
    {name: 'Mindtree', value: 'Mindtree'},
    {name: 'Blue Yonder', value: 'Blue Yonder'},
    {name: 'GE', value: 'GE'},
    {name: 'Zensar', value: 'Zensar'},   
    {name: 'Ericsson Global', value: 'Ericsson Global'},
    {name: 'Infoworks', value: 'Infoworks'},
    {name: 'Collins Aerospace', value: 'Collins Aerospace'},
    {name: 'L&T', value: 'L&T'},
    {name: 'Lenscart', value: 'Lenscart'},
    {name: 'Pensando', value: 'Pensando'},
  ];
const [pt,setPt] = useState("Amazon");
useEffect(()=>{
  try{
    getDocs(query(collection(db, "feedbackdb"), where("company_name", "==", pt)))
        .then( snapshot => {
          if(snapshot.docs.length === 0)
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
},[]);
  let navigate = useNavigate();
  const colRef = collection(db, "feedbackdb");
  function filter(){
    try{
      getDocs(query(colRef, where("company_name", "==", pt)))
          .then( snapshot => {
            if(snapshot.docs.length === 0)
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
      <Button variant="light" onClick={()=>navigate('/home')}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
      <div>
        <h2 className="subtopic-name">Feedback from Alumni</h2>
      </div>
      <div>
      <form className='box-n mt-5' onSubmit={handleSubmit}>
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
      <Button className="e-feedback" onClick={()=>navigate('addFeedback')}>Placed? Give Feedback</Button>
    <Footbar class="footBar-bottom"/>
      </>
    );

};
