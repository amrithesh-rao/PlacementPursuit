import React from 'react';
import { Button } from 'react-bootstrap';



export default function NumberBox(props) {

    return (
        <div className={"nbox align-middle " +props.css}>
          <Button variant={props.css} onClick={props.handleClick}>
            {props.questionNo}
            </Button>
        </div>
    )
  }
  