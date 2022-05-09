import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { useLocation } from "react-router-dom";
export default function QuizReport() {
  
  const location=useLocation();
  return (
    <>
      <NavBar />
      {console.log(location.state)}
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
