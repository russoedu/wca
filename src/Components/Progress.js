import React from 'react'
import { ProgressBar, Row, Col } from 'react-bootstrap'
import './Progress.css'

export function Progress ({ title, percentage }) {
  return (
    <Row className="progress-item">
      <Col xs={3}>
        <p>{title}:</p>
      </Col>
      <Col>
        <ProgressBar now={percentage} label={`${percentage}%`}/>
      </Col>
    </Row>
  )
}
