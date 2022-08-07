import React from 'react'

import ContactoForm from '../components/ContactoForm';

import '../style/contactanos.css';

import { Container, Row, Col } from 'react-bootstrap';

export default function Contactanos() {
  return (
    <Container className='contactanos-container'>
        <h3>Contáctanos</h3>
        <hr />
        <p>¿Tienes preguntas? Llena el formulario con tus datos y dudas y te responderémos en cuanto podamos.</p>
        <Row>
            <Col xs={12} md={8} className='mb-4'>
              <ContactoForm></ContactoForm>
            </Col>
            <Col xs={12} md={4}>
              <Container className="contacto-info-div">
                <h4>Informacion de contacto</h4>
                <hr />
                <p>Telefono: 612-140-0284</p>
                <hr />
                <p>Correo: idslpa@hotmail.com</p>
                <hr />
                <p>Direccion: Nueva Reforma #254, entre Riva Palacio y Brecha California, La Paz, Baja California Sur</p>
              </Container>
            </Col>
        </Row>
    </Container>
  )
}
