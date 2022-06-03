import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { useLocation } from "react-router-dom";

export default function QuizReport() {
  
  const location=useLocation();
  const {score,tq,questions,answers,quizNo} =location.state;
  const attempted = [];
  const avg=parseInt(score/tq*100);
  const cssval={"--value":avg}
  for(let x in answers){
    attempted.push(parseInt(x));
  }
  useEffect(() => {
    const divs= document.getElementsByClassName("qreport")
    let i;
    console.log(attempted)
    for(i=0;i<15;i++){
      if(attempted.includes(parseInt(divs[i].id))){
        console.log(divs[i].id)
        
      }else{
        divs[i].classList.add("unattempted")
      }
    }
}, [])
  return (
    <>
      <NavBar />
      <h1 className="m-3 quizno">Quiz-{quizNo}</h1>
      <div className="main-div">
      
      <div className="first-div mx-auto" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={cssval}></div>
      <div className="p-4 score-div">
        {score}/{tq}
      </div>
      <div className="second-div mx-auto">
      <div className="des-box">
      <div className="q-box attempted"></div><p>Attempted Questions</p>
      </div>
      <div className="des-box">
      <div className="q-box unattempted"></div><p>Unattempted Questions</p>
      </div>
      <div className="des-box">
      <div className="q-box correct"></div><p>Correct Answer</p>
      </div>
      <div className="des-box">
      <div className="q-box wrong"></div><p>Wrong Answer</p>
      </div>   
      </div>
      </div>
      
      {
        
      
        questions.map((question)=>(<>
        
        
          <div className="qreport w-75 m-5 mx-auto" id={questions.indexOf(question)+1}>
          
            <div className=" m-2 p-3">
            {questions.indexOf(question)+1}) {question.data.question}
            
            </div>
            <div className="m-2 p-3">
              {question.data.options?.map(option=>(
                  answers[questions.indexOf(question)+1]===question.data.answer?
                    option===question.data.answer?<>
                      <div className=" option correct m-3 p-3">
                        {option}
                      </div>
                      </>:
                    <>
                      <div className="option oreport m-3 p-3">
                        {option}
                      </div>
                      </>
                    
                  :option===answers[questions.indexOf(question)+1]?<>
                  <div className="option wrong m-3 p-3">
                    {option}
                  </div>
                  </>:option===question.data.answer?<>
                      <div className="option correct m-3 p-3">
                        {option}
                      </div>
                      </>:
                <>
                  <div className="option oreport m-3 p-3">
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
      
      <Footbar class="footBar"/>
    </>
  );
}
                                 