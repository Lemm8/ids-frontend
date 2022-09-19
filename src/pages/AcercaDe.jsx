import React from 'react'

import '../style/acercade-style.css'

import { Container, Row, Col } from 'react-bootstrap';

export default function AcercaDe() {  
  return (
    <div>
      <Container className='d-flex justify-content-center mt-5'>
        <Row>
            <Col xs={12} md={6} className="text-center">
                <h3>Acerca De</h3>
                <hr />
                <p>IDS es una empresa de instalaciones de hardware y sistemas de seguridad que surgio a princpio de los 2000 con el fin de realizar instalaciones locales de alta calidad.</p>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
                <img src={require('../imgs/acercade.png')} alt="" className="acercade-img"/>
            </Col>
        </Row>        
    </Container>
    </div>
  )
}
