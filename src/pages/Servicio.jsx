import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import '../style/servicio-page-style.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { axiosPrivate } from '../api/api';

import { Link } from 'react-router-dom';

export default function Servicio() {

    const { id } = useParams();

    const [servicio, setServicio] = useState([]);

    const renderImage = ( nombre ) => {
        switch (nombre) {
          case "Cableado":            
            return <img src={require("../imgs/cableadoestructurado.png")} alt="" className="acercade-img"/>;
          case "Telefonía IP":      
            return <img src={require("../imgs/telefonia.png")} alt="" className="acercade-img"/>;
          case "Soporte Técnico":      
            return <img src={require("../imgs/simplePc.png")} alt="" className="acercade-img"/>;
          case "Videovigilancia":      
          return <img src={require("../imgs/camera-icon.png")} alt="" className="acercade-img"/>;
          case "Cercas Eléctricas":        
            return <img src={require("../imgs/cercas.png")} alt="" className="acercade-img"/>;
        }
    }

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const getServicios = async () => {
            try {
                const response = await axiosPrivate.get(`/servicios//${id}`, {
                    signal: controller.signal
                });
                if ( mounted ) setServicio( response.data.servicio );  

            } catch (error) {
                console.error(error);
            }
        }
        getServicios();
    
      return () => mounted = false;
    }, [id])

    return (    
        <Container className='d-flex justify-content-center mt-5'>
            <Row>
                <Col xs={12} md={6} className="text-center">
                    <h3>{ servicio.nombre }</h3>
                    <hr />
                    <p>{ servicio.descripcion } <br /> ¿Te interesa este servicio? </p>
                    <Button as={Link} to="/nuevopedido" variant="outline-primary">Realizar un pedido</Button>
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-center">
                    {renderImage( servicio.nombre )}
                </Col>
            </Row>        
        </Container>
    )
}
