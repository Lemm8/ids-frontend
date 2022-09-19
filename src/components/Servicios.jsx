import React, { useEffect, useState } from 'react'
import '../style/servicios-style.css';
import { Container, Row, Col } from 'react-bootstrap';
import Servicio from './Servicio';

import { axiosPrivate } from '../api/api';

export default function Servicios() {

    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const getServicios = async () => {
            try {
                const response = await axiosPrivate.get('/servicios', {
                    signal: controller.signal
                });
                if ( mounted ) setServicios( response.data.servicios.rows );  

            } catch (error) {
                console.error(error);
            }
        }
        getServicios();
    
      return () => mounted = false;
    }, [])
    

    return (
        <Container className="servicios-container">
            <Row className="servicios-row d-flex justify-content-center">    
                { servicios.map( servicio => 
                    <Col xs={12} md={6} lg={4} className='servicio-col d-flex justify-content-center mb-4'>
                        <Servicio servicio={ servicio }/>
                    </Col> ) }
            </Row>
        </Container>     
    ) 
}
