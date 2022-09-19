import React, { useEffect, useState } from 'react'

import { Container, Button, Row, Col } from 'react-bootstrap';

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from '../hooks/useAuth';

import { useNavigate, useLocation } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

import PedidosTable from '../components/PedidosTable';

import '../style/mispedidos-style.css'

export default function MisPedidos() {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [ pedidos, setPedidos ] = useState( {} );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPedidos = async () => {

      setIsLoading( true )
      let response;
      console.log( auth );

      try {        
        switch ( auth.rol ) {
          case 'admin':
            response = await axiosPrivate.get(`/pedidos`, {
              signal: controller.signal,
              headers: {
                'x-token': auth.accessToken
              }          
            });
            break;
          case 'cliente':
            response = await axiosPrivate.get(`/pedidos/cliente/${ auth.info.id }`, {
              signal: controller.signal,
              headers: {
                'x-token': auth.accessToken
              }
            });
            break;
          case 'tecnico':
            response = await axiosPrivate.get(`/pedidos/tecnico/${ auth.info.id }`, {
              signal: controller.signal,
              headers: {
                'x-token': auth.accessToken
              }          
            });
            break;
          default:
            response = await axiosPrivate.get(`/pedidos/cliente/${ auth.info.id }`, {
              signal: controller.signal,
              headers: {
                'x-token': auth.accessToken
              }
            });
            break;
        }

        isMounted && setPedidos( response.data.pedidos.rows );        
        setIsLoading( false )

      } catch (error) {
        console.log( error );
        if ( error.response.data?.error?.name === 'TokenExpiredError' ) {
          navigate( '/login', { state: { from: location }, replace: true } );
        } 
        if ( error.response.data?.status === 404 ) {
          setPedidos({});
        }
      }
    }
    console.log( pedidos )
    getPedidos();
    setIsLoading( false );

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [""]);

  return (
    <Container className='pedidos-container'>
      <Row className='pedidosHeader'>
        <Col xs={12} md={6}>
          <h1>Mis Pedidos</h1>
        </Col>
        <Col xs={12} md={3}>
          <Button variant="outline-primary" href="/nuevopedido" type="submit">
            Realizar un pedido
          </Button>
        </Col>
        <Col xs={12} md={3}>
          Para ver la información de un pedido, haz click en la fila donde esté
        </Col>
      </Row>
            
      { isLoading
        ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
        // ? <><h4>Cargando, espere un momento...</h4><br /><LoadingSpinner /></>
        : Object.keys(pedidos).length === 0
          ? <h4>No tienes pedidos</h4>
          : <><PedidosTable pedidos={pedidos}></PedidosTable></>}
      
    </Container>
  )
}
