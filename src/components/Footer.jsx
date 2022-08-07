import React from 'react'
import '../style/footer-style.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container fluid className="footer-container d-flex">
        <Row className="footer-row my-auto w-100"> 
            <Col className='red-social-col d-block justify-content-start'>              
              <img className="logo-footer" src={require('../imgs/logo.png')} alt="IDS Logo" />
              <h6>612-111-2022</h6>
              <h6>Nueva Reforma #254</h6>
              <h6>idslpa@hotmail.com</h6>                 
            </Col>     
            <Col className='red-social-col my-auto d-flex justify-content-end'>
                 <img className='redes-img' src={require('../imgs/fb.png')} alt="facebook" />
                 <img className='redes-img' src={require('../imgs/tw.png')} alt="twitter" />
                 <img className='redes-img' src={require('../imgs/ig.png')} alt="instagram" />                 
            </Col>
        </Row>
    </Container>     
  )
}
