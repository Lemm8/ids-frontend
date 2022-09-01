import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Form } from 'react-bootstrap'

import ActualizarPedidoForm from '../components/ActualizarPedidoForm'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from '../hooks/useAuth';

import LoadingSpinner from '../components/LoadingSpinner';

import { useNavigate, useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export default function ActualizarPedido() {

    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [pedido, setPedido] = useState({});
    const [cliente, setCliente] = useState({});
    const [servicio, setServicio] = useState({});
    const [tecnicos, setTecnicos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);    

    const { id } = useParams();

    const getDetallesPedido = async () => {
        const controller = new AbortController();
        try {            
            const response = await axiosPrivate.get(`/pedidos/${id}`, {
                controller: controller.signal,
                headers: {
                    'x-token': auth.accessToken
                }  
            });

            setPedido( response.data.pedido );
            setCliente( response.data.pedido.Cliente );
            setServicio( response.data.pedido.Servicio );
            setTecnicos( response.data.pedido.Tecnicos );

        } catch (error) {
            console.log( error.response.data );
            if ( error.response.data?.error?.name === 'TokenExpiredError' ) {
                navigate( '/login', { state: { from: location }, replace: true } );
            } 
            if ( error.response.data?.status === 404 ) {
                setPedido({});
            }
        } 
    }

    useEffect(() => {
        setIsLoading( true );
        getDetallesPedido();
        setIsLoading( false );
    }, [])

    return (
        <Container className='pedidos-container'>
            <Row>
                <Col xs={12} md={6}>
                    <h1>Actualizar Pedido</h1>
                </Col>
            </Row>
            { isLoading
                ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
                : <> <ActualizarPedidoForm pedido={ pedido } cliente={ cliente } servicio={ servicio } tecnicosPedido={ tecnicos } /> </> }
        
        </Container>
  )
}
