import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function QuizReport() {
  
  const location=useLocation();
  const {score,tq,questions,answers} =location.state;
  const attempted = [];
  for(let x in answers){
    attempted.push(parseInt(x));
  }
  
  return (
    <>
      <NavBar />
      {console.log(score,tq,questions,answers)}
      <h2 className="m-3">Quiz-1</h2>
      {
        
      
        questions.map((question)=>(<>
        {/* {questions.indexOf(question)+1 in attempted?console.log():document.querySelector("#ques").classList.add("unattempted")} */}
          
          <div className="qreport w-75 m-5 mx-auto" id="questionn">
            <div className=" m-2 p-3">
            {questions.indexOf(question)+1}) {question.data.question}
            </div>
            <div className="m-2 p-3">
              {question.data.options.map(option=>(
                  answers[questions.indexOf(question)+1]===question.data.answer?
                    option===question.data.answer?<>
                      <div className="correct m-3 p-3">
                        {option}
                      </div>
                      </>:
                    <>
                      <div className="oreport m-3 p-3">
                        {option}
                      </div>
                      </>
                    
                  :option===answers[questions.indexOf(question)+1]?<>
                  <div className="wrong m-3 p-3">
                    {option}
                  </div>
                  </>:option===question.data.answer?<>
                      <div className="correct m-3 p-3">
                        {option}
                      </div>
                      </>:
                <>
                  <div className="oreport m-3 p-3">
                    {option}
                  </div>
                  </>
                  
                  
                
                  ))}
            </div>
          
          </div>
          </>
        )

        )
        
      }
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
