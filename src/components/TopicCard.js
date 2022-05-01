import React from 'react';
import {Card,Button} from 'react-bootstrap';
import cardBackground from '../img/topic_background.webp'

export default function TopicCard(props) {
    return (
        <Card bg="light" style={{ width: '18rem' }}>
            <Card.Img src={cardBackground} alt="Card image" style={{opacity:0.4}} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title className='text-center'>{props.title}</Card.Title>
    
  </Card.Body>
  <div className='mx-auto'><Button variant="primary">Take Quiz</Button></div>
  </Card.ImgOverlay>
</Card>
    )
  }
  