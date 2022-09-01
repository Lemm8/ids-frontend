import React from 'react'
import { useParams } from 'react-router-dom'

import '../style/servicio-page-style.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function Servicio() {

    const { id } = useParams();

    return (    
        <Container className='d-flex justify-content-center mt-5'>
            <Row>
                <Col xs={12} md={6} className="text-center">
                    <h3>{ `Servicio ${id}` }</h3>
                    <hr />
                    <p>{ `Esta es la descripicion del servicio con el id: ${id}` } <br /> ¿Te interesa este servicio? </p>
                    <Button as={Link} to="/" variant="outline-primary">Realizar un pedido</Button>
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-center">
                    <img src={require('../imgs/acercade.png')} alt="" className="acercade-img"/>
                </Col>
            </Row>        
        </Container>
    )
}
