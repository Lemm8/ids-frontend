import React from 'react'
import '../style/servicios-style.css';
import { Container, Row, Col } from 'react-bootstrap';
import Servicio from './Servicio';

export default function Servicios() {
  return (
    <Container className="servicios-container">
        <Row className="servicios-row d-flex justify-content-center">            
            <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                <Servicio />
            </Col>
            <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                <Servicio />
            </Col> 
            <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                <Servicio />
            </Col>
            <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                <Servicio />
            </Col>
            <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                <Servicio />
            </Col>
        </Row>
    </Container>     
  )
}
