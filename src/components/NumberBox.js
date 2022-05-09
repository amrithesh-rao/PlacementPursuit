import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



export default function NumberBox(props) {

  let navigate = useNavigate();
    return (
        <div className="nbox align-middle">
          <Button onClick={props.handleClick}>
            {props.questionNo}
            </Button>
        </div>
    )
  }
  