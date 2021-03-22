import React from 'react';
import { Col, Container, Row } from "react-bootstrap"
import { DisplayMovie } from "./DisplayMovie"

export function DisplayList({ movies }) {
  if (!movies.length) {
    return (
      <Container>
        <Col className="overflow-hidden" lg={12} style={{height: '90vh'}}>
          <Row className="h-100">
            <Col className="align-self-center text-center">
              <h5>No movies found...</h5>
            </Col>
          </Row>
        </Col>
      </Container>
    )
  }
  return (
    <Container>
      <Row className="mt-5">
        {movies.map((item) => <DisplayMovie movie={item} key={item.id} />)}
      </Row>
    </Container>
  )
}