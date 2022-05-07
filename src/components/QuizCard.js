import React from 'react';
import {Card,Button} from 'react-bootstrap';
import cardBackground from '../img/topic_background.webp';
import { useNavigate } from "react-router-dom";



export default function QuizCard(props) {

  let navigate = useNavigate();
    
    return (
      <Card className=" quiz-card mx-auto">
      <Card.Body>
        <Card.Title>Q{props.questionNo} : {props.question}</Card.Title>
        <Card.Text>
          {props.options.map(option=><div>
            {props.options.indexOf(option)+1}. {option}
          </div>)}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    )
  }
  