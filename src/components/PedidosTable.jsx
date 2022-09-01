import React, { useState, useEffect } from 'react'

import { Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import PedidoDetalles from './PedidoDetalles';

export default function PedidosTable( {pedidos} ) {

    const { auth } = useAuth();    

    const [pedidoInfo, setPedidoInfo] = useState({});
    const [clienteInfo, setClienteInfo] = useState({});
    const [servicioInfo, setServicioInfo] = useState({});
    const [tecnicos, setTecnicos] = useState([]);
    const [pedidoSelected, setPedidoSelected] = useState(false);

    const handleClickOpen = () => {
        setPedidoSelected( true );
    }

    const handleClose = () => {
        setPedidoSelected( false );
    }

    const pagination = paginationFactory({
        sizePerPage: 5,
        sizePerPageList: [{
            text: '5',
            value: 5
        }, {
            text: '10',
            value: 10
        }, {
            text: 'Todos',
            value: pedidos.length
        }]
    })

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

    const validateCosto = ( costo ) => {
        if ( costo === 0 ) {
            return null
        }
        return costo
    }

    const data = pedidos;
    const columns = [{
        dataField: 'id',
        text: 'Pedido id',
    }, {
        dataField: 'titulo',
        text: 'Título',
        editable: false
    }, {
        dataField: 'costo',
        text: 'Costo',
        formatter: validateCosto
    }, {
        dataField: 'lugar_entrega',
        text: 'Lugar de entrega'
    }, {
        dataField: 'fecha_solicitud',
        text: 'Fecha de solicitud',
        sort: true,
        formatter: formatDate
    }, {
        dataField: 'Servicio.nombre',
        text: 'Servicio'
    }, {
        dataField: 'progreso',
        text: 'Progreso' 
    }]

    if ( auth.rol === 'tecnico' || auth.rol === 'admin' ) columns.push({
        dataField: '',
        text: 'Actualizar',
        formatter: ( rowContent, row ) => {
            return (
                <>                
                    <Link to={`/actualizarpedido/${row.id}`}><i className="fa fa-edit"></i></Link>
                </>
            )
        }
    });
    
    const rowEvents = {
        onClick: ( e, row, rowIndex ) => {            
            setPedidoInfo( row );
            setServicioInfo( row.Servicio );
            setClienteInfo( row.Cliente );
            setTecnicos( row.Tecnicos );
            handleClickOpen()
            console.log( row );
        }
    }


    return (
        <Row>
            <Col xs={12}>
                <BootstrapTable 
                    keyField='idTabla' 
                    data={ data } 
                    columns={ columns } 
                    rowEvents={ rowEvents } 
                    striped hover condensed 
                    pagination={ pagination }
                />        
            </Col>
            <Col xs={12}>
                <PedidoDetalles
                    pedido={pedidoInfo} 
                    servicio={servicioInfo} 
                    tecnicos={tecnicos} 
                    cliente={clienteInfo}
                    open={pedidoSelected}
                    onClose={handleClose}
                >       
                </PedidoDetalles>
            </Col>
        </Row>        
    )
}
