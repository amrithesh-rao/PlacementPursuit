import React from "react";
import NavBar from "../components/NavBar";
import Footbar from "./Footbar";
import { Button, Carousel } from "react-bootstrap";

import testCarousel from "../img/testCarousel.png";
import feedbackCarousel from "../img/feedbackCarousel.png";
import practiceCarousel from "../img/practiceCarousel.png";
import homeCarousel from "../img/homeCarousel.png";

import testSectionImg from "../img/testSectionImg.png";
import feedbackSectionImg from "../img/feedbackSectionImg.png";
import practiceSectionImg from "../img/practiceSectionImg.jpg";

const Home = () => {

  return (
    <>
    <div>
    <NavBar />
    <Carousel>
   <Carousel.Item>
    <img
      className="d-block w-75 mx-auto mb-5"
      src= { homeCarousel}
      alt="First slide"
      width={800} height={645}
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-75 mx-auto mb-5"
      src= { practiceCarousel }
      alt="Second slide"
      width={800} height={645}
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-75 mx-auto mb-5"
      src= { testCarousel }
      alt="Third slide"
      width={800} height={645}
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-75 mx-auto mb-5"
      src= { feedbackCarousel }
      alt="Fourth slide"
      width={800} height={645}
    />
  </Carousel.Item>
</Carousel>
</div>

 <div className="container" id="practice">
   <div className="row">
    <div className="col">
    <img src = { practiceSectionImg } alt="practice" width={800} height={450}/>
    </div>
    <div className="col">
     <div><p className="h1 p-4 mt-5">Practice Section holds all materials for concepts that are important to interview.</p></div> 
    <div className="p-2 m-3"><Button>Practice ---{'>'}</Button></div>
    </div>
   </div>
   </div>

   <div className="container"  id="test">
   <div className="row">
    <div className="col">
    <div><p className="h1 p-4 mt-5 ml-7">After studying from Practice Section, test your knowledge using quizes in Test Section</p></div> 
    <div className="p-2 ml-10"><Button>Test ---{'>'}</Button></div>
    </div>
    <div className="col">
    <img src = { testSectionImg } alt="test" width={800} height={450}/>
    </div>
   </div>
   </div>

   <div className="container mb-5"  id="feedback">
   <div className="row">
    <div className="col">
    <img src = { feedbackSectionImg } alt="feedback" width={800} height={450}/>
    </div>
    <div className="col">
    <div><p className="h1 p-4 mt-5">Read feebacks from seniors and prepare accordingly for interview process of specific companies.</p></div> 
    <div className="p-2 m-3"><Button>Feedback ---{'>'}</Button></div>
    </div>
   </div>
   </div>
    <Footbar />
    </>
  );
};

export default Home;