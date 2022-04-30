import React from "react";
import NavBar from "../components/NavBar";
import Footbar from "./Footbar";
import { Link, useNavigate } from "react-router-dom";


const TestHome = () => {
    let navigate = useNavigate();
  return (
    <>
    <NavBar />
    
    <Footbar />
    </>
  );
};

export default TestHome;