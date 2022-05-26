import React from 'react';
import {Card,Button} from 'react-bootstrap';
import cardBackground from '../img/topic_background.webp'
import { useNavigate } from "react-router-dom";

export default function SearchCard(props) {
  let navigate = useNavigate();

    return (
        <Card bg="light" style={{ width: '18rem' }}>
            <Card.Img src={cardBackground} alt="Card image" style={{opacity:0.4}} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title className='text-center'>{props.name}</Card.Title>
    
  </Card.Body>
  <div className='subtopic-name mt-3'><Button variant="primary" onClick={()=>navigate( props.id,{state:{name:props.name}})}>Open now</Button></div>
  </Card.ImgOverlay>
</Card>
    )
  }