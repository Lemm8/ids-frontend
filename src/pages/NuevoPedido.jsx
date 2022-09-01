import React, { useState } from 'react'

import { Container } from 'react-bootstrap'

import NuevoPedidoClienteForm from '../components/NuevoPedidoClienteForm';

export default function NuevoPedido() {


  return (
    <Container>
      <h2>Nuevo Pedido</h2>
      <NuevoPedidoClienteForm />
    </Container>
    
  )
}
