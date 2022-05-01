import React from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { Link, useNavigate } from "react-router-dom";
import TopicCard from "./TopicCard";

const TestHome = () => {
    let navigate = useNavigate();
  return (
    <>
    <NavBar />
        <TopicCard title="Data Structures" />
    <Footbar />
    </>
  );
};

export default TestHome;