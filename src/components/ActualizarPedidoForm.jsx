import React, { useState, useEffect } from 'react';

import { Button, Form, Alert, ListGroup } from 'react-bootstrap';

import useAuth from "../hooks/useAuth.jsx";

import { useNavigate, useLocation } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function ActualizarPedidoForm ({ pedido, cliente, servicio, tecnicosPedido }) {

    const [form, setForm] = useState({progreso: 'En proceso'});
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [isLoading, setIsLoading] = useState({});
    const [tecnicos, setTecnicos] = useState([]);
    const [selectedTecnicos, setSelectedTecnicos] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    // GUARDAR VALORES DEL FORMULARIO
    const setField = ( field, value ) => {
        setForm({
            ...form,
            [field]: value
        });
        // VER SI EXISTE ERROR Y REMOVERLO
        if ( !!errors[ field ] ) setErrors({
            ...errors,
            [field]: null            
        });
    }

    const handleSelectedTecnicos = ( value ) => {
        const array = value.split( "," )
        setSelectedTecnicos( array )
    }

    const findFormErrors = () => {
        // CAMPOS
        const { costo, progreso, lugar_entrega, tecnico } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR COSTO
        if ( !costo || costo === '' ) form.costo = pedido.costo;
        else if ( isNaN( costo ) ) newErrors.costo = 'El costo debe ser numerico';

        // VALIDAR PROGRESO
        if ( !progreso || progreso === '' ) newErrors.progreso = 'El progreso es obligatorio';
        if ( progreso !== 'En espera' && progreso !== 'En proceso' && progreso !== 'Listo' ) newErrors.progreso = 'Este estado de proceso no es valido'

        // VALIDAR LUGAR DE ENTREGA
        if ( !form.lugar_entrega || form.lugar_entrega === '' ) form.lugar_entrega = pedido.lugar_entrega;

        return newErrors;

    }
    

    const getTecnicos = async () => {
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`/tecnicos`, {
                controller: controller.signal
            })

            setTecnicos( response.data.tecnicos.rows )            
        } catch (error) {
            if ( error.response.data?.status === 404 ) {
                setTecnicos([]);
            }
        }
    }



    const handleSubmit = ( e ) => {
      e.preventDefault();
      // VER ERRORES
      const newErrors = findFormErrors();
      // VER SI HAY ERRORES
      if ( Object.keys( newErrors ).length > 0 ) {
          setErrors( newErrors );
      } else {                   
            const controller = new AbortController(); 
            const updatePedido = async () => {
                try {
                    console.log( form.lugar_entrega )
                    const response = await axiosPrivate.put( `/pedidos/${pedido.id}`, {
                    costo: Number(form.costo),
                    lugar_entrega: form.lugar_entrega,
                    nota: form.nota,
                    progreso: form.progreso,
                    tecnicos: selectedTecnicos,
                    }, {
                        controller: controller.signal,
                        headers: {
                        'x-token': auth.accessToken
                        }
                    })             
                } catch (error) {
                    console.log( error.response.data );
                    if ( error.response.data?.error?.name === 'TokenExpiredError' ) {
                        navigate( '/login', { state: { from: location }, replace: true } );
                    } 
                }               
            }            
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            updatePedido();
            setSent( true );   
        }
    }


    useEffect(() => {
        setIsLoading( true );
        getTecnicos();
        setIsLoading( false );
    }, [])
    

    return (
        <>
            { sent
                ? isLoading
                    ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
                    : <Alert variant='success'>Se ha actualizado el pedido con exito</Alert>
                : <></>
            }
                <Form onSubmit={handleSubmit} className="pedido-form shadow-lg p-3">
                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Título: { pedido.titulo }</Form.Label>
                        </Form.Group>
            
                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Descripción: { pedido.descripcion }</Form.Label>
                        </Form.Group>                        
            
                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Cliente: { cliente.nombre }</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Servicio: { servicio.nombre }</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Lugar de entrega</Form.Label>
                            <Form.Control 
                                onChange={ e=> setField('lugar_entrega', e.target.value) } 
                                placeholder={ pedido.lugar_entrega }
                            />      
                            <Form.Control.Feedback type='invalid'> { errors.lugar_entrega } </Form.Control.Feedback>                  
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control 
                                onChange={ e=> setField('costo', e.target.value) } 
                                placeholder={ !pedido.costo ? '-----' : `${pedido.costo}` }
                                isInvalid={ !!errors.costo }
                            />
                            <Form.Control.Feedback type='invalid'> { errors.costo } </Form.Control.Feedback>
                        </Form.Group>
            
                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Nota</Form.Label>
                            <Form.Control 
                                onChange={ e=> setField('nota', e.target.value) } 
                                placeholder="*Opcional* Nota de actualización"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registroform-correo">
                            <Form.Label>Progreso</Form.Label>
                            <Form.Control
                                as="select"
                                required
                                isInvalid={ !!errors.progreso }
                                onChange={ e => setField('progreso', e.target.value)}
                                >
                                    <option key="1" value="En espera"> En espera </option>
                                    <option key="2" value="En proceso"> En proceso </option>
                                    <option key="3" value="Listo"> Listo </option>
                            </Form.Control>
                        </Form.Group>
            
                        { auth.rol === 'admin'
                            ? <Form.Group className="mb-3" controlId="registroform-correo">
                                    <Form.Label>Tecnicos</Form.Label>
                                    { tecnicosPedido.length === 0
                                        ?  <ListGroup horizontal>
                                                { tecnicosPedido.map( tecnico => <ListGroup.Item>{ tecnico.nombre }</ListGroup.Item> ) }
                                            </ListGroup>
                                        : <></>}
                                    <MultiSelect
                                        options={ tecnicos.map( tecnico => ({ label: tecnico.nombre, value: tecnico.id }) ) }
                                        onChange={ handleSelectedTecnicos }
                                    ></MultiSelect>                            
                                    <Form.Control.Feedback type='invalid'> { errors.progreso } </Form.Control.Feedback>
                                </Form.Group>
                            : <></> }
                        <Button variant="outline-primary" type="submit">
                            Actualizar
                        </Button>
                    </Form>
            
        </>
    )
}
