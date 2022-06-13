import React from 'react';
import {Card,Button} from 'react-bootstrap';
import cardBackground from '../img/topic_background.webp'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function PracticeCard(props) {
  let navigate = useNavigate();

    return (
        <Card bg="light" style={{ width: '18rem' }}>
            <Card.Img src={cardBackground} alt="Card image" style={{opacity:0.4}} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title className='text-center'>{props.title}</Card.Title>
    
  </Card.Body>
  <div className='subtopic-name mt-3'><Button variant="primary" onClick={()=>navigate( props.id,{state:{title : props.title }} )}><FontAwesomeIcon icon={solid('chalkboard-user')}/> Practice now</Button></div>
  </Card.ImgOverlay>
</Card>
    )
  }
  