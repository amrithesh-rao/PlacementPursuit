import React from 'react';
import {Card,Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



export default function NumberBox(props) {

  let navigate = useNavigate();
    return (
        <div className="nbox align-middle">
            {props.questionNo}
        </div>
    )
  }
  