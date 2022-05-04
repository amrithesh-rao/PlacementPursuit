import React from 'react';
import {Card,Button} from 'react-bootstrap';
import cardBackground from '../img/topic_background.webp'
import { useNavigate } from "react-router-dom";
export default function PracticeCard(props) {
    let navigate = useNavigate();

    return (
        <Card bg="light" style={{ width: '18rem' }}>
            <Card.Img src={cardBackground} alt="Card image" style={{opacity:0.4}} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title className='text-center'>{props.subtitle}</Card.Title>
    
  </Card.Body>
  <div className='mx-auto'><Button variant="primary" onClick={()=>navigate( props.id )}>Practice now</Button></div>
  </Card.ImgOverlay>
</Card>
    )
  }
  