import React from 'react';
import { Col, Row, Card } from 'react-materialize';

const RelatedCardDefault = (props) => {
 
  return (
    <Card className='frame default-text'>
      <Row>
        <h6>DISCOVER MORE</h6>
        <Col>
          <h6>PEOPLE</h6>
          <p>trending person</p>
          <h6>MOVIES</h6>
          <p>trending movie</p>
          <h6>MUSIC</h6>
          <p>trending music</p>
          <h6>STORIES</h6>
          <p>trending story</p>
          <p>{props.story1}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default RelatedCardDefault;
