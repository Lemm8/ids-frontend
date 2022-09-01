import React from 'react';

import { ListGroup } from 'react-bootstrap';
import { Dialog, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function PedidoDetalles({pedido, cliente, tecnicos, servicio, onClose, open}) {  

  const { auth } = useAuth();

  const validarActualizacion = () => {
    return auth.rol === 'admin' || auth.rol === 'tecnico'
  }    

  const progresoStyle = ( progreso ) => {
    switch ( progreso ) {
      case 'En espera':
          return <ListGroup.Item>Progreso: <span class='text-warning'> { pedido.progreso } </span></ListGroup.Item>
      case 'En proceso':
          return <ListGroup.Item>Progreso: <span class='text-primary'> { pedido.progreso } </span></ListGroup.Item>
      case 'Listo':
          return <ListGroup.Item>Progreso: <span class='text-success'> { pedido.progreso } </span></ListGroup.Item>    
      default:
          return <ListGroup.Item>Progreso: <span class='text-primary'> { pedido.progreso } </span></ListGroup.Item>
    }
  }

  const formatDate = ( date ) => {
    const newDate = new Date( date );
    let day, month, year;
    day = newDate.getDate();
    month = newDate.getMonth();
    year = newDate.getFullYear();
    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const handleClose = () => {
    onClose();
  }

  return (     
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>
        { pedido.titulo }
      </DialogTitle>
      <ListGroup> 
        <ListGroup.Item>
        { tecnicos.length == 0
        ? <>Todavia no se ha asignado un tecnico</>
        : <>                
            <ListGroup horizontal>
              Tecnicos a cargo:
              { tecnicos.map( (tecnico, i) => <> { tecnicos[i+1] ? `${ tecnico.nombre }, ` : `${ tecnico.nombre }` } </> ) }
            </ListGroup>
          </> }
        </ListGroup.Item>
        <ListGroup.Item>Hecho por: { cliente.nombre }</ListGroup.Item>
        <ListGroup.Item>Solicitado en: { formatDate(pedido.fecha_solicitud) }</ListGroup.Item>
        <ListGroup.Item>Costo: { pedido.costo === 0 ? 'Pendiente' : `$${pedido.costo}mxn` }</ListGroup.Item>
        <ListGroup.Item>Ultima actualizacion: { formatDate(pedido.fecha_solicitud) }</ListGroup.Item>
        { progresoStyle( pedido.progreso ) }        
        <ListGroup.Item>Lugar de entrega: { pedido.lugar_entrega }</ListGroup.Item>
        { validarActualizacion 
          ? <ListGroup.Item> <Link to={`/actualizarpedido/${pedido.id}`}>Actualizar pedido</Link> </ListGroup.Item>
          : <></> }
        
      </ListGroup>

    </Dialog> 
  )
}
