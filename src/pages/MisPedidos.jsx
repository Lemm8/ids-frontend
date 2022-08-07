import React, { useEffect, useState } from 'react'

import { Container, Button } from 'react-bootstrap';

// import { getPedidosCliente } from '../api/pedidos';

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from '../hooks/useAuth';

import { useNavigate, useLocation } from 'react-router-dom';


export default function MisPedidos() {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [ pedidos, setPedidos ] = useState( '' );
  const [ existePedidos, setExistePedidos ] = useState( false );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPedidos = async () => {

      try {

        const response = await axiosPrivate.get(`/pedidos?cliente=${ auth.usuario.id }`, {
          signal: controller.signal,
          headers: {
            'x-token': auth.accessToken
          }          
        });

        console.log( response.data ) 
        isMounted && setPedidos( response );

      } catch (error) {
        console.log( error.response.data );
        if ( error.response.data?.error?.name === 'TokenExpiredError' ) {
          navigate( '/login', { state: { from: location }, replace: true } );
        }        
      }
    }
    
    getPedidos();

    return () => {
      isMounted = false;
      controller.abort();
    }

  });

  return (
    <Container className='pedidos-container'>
      <h1>Mis Pedidos</h1>
      {/* { existePedidos } */}
    </Container>
  )
}
