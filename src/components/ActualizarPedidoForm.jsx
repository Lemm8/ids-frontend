import React, { useState, useEffect } from 'react';

import { Button, Form, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

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
    const [progreso, setProgreso] = useState('En proceso');
    const [costo, setCosto] = useState(0);

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
        const { costo, progreso, tecnico } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR COSTO
        if ( !costo || costo === '' ) newErrors.costo = 'El costo es obligatorio';
        if ( isNaN( costo ) ) newErrors.costo = 'El costo debe ser numerico';

        // VALIDAR PROGRESO
        if ( !progreso || progreso === '' ) newErrors.progreso = 'El progreso es obligatorio';
        if ( progreso !== 'En espera' && progreso !== 'En proceso' && progreso !== 'Listo' ) newErrors.progreso = 'Este estado de proceso no es valido'

        // VALIDAR TECNICO

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
          try {   
              if ( !form.lugar_entrega || form.lugar_entrega === '' ) form.lugar_entrega = 'Nueva Reforma #254, entre Riva Palacio y Brecha California, colonia Benito Juarez';
              console.log( 'Enviado' )
              const updatePedido = async () => {
                  const controller = new AbortController();                    
                  const response = await axiosPrivate.put( `/pedidos/${pedido.id}`, {
                    costo: Number(form.costo),
                    lugar_entrega: form.lugar_entrega,
                    progreso: form.progreso,
                    tecnicos: selectedTecnicos,
                  }, {
                      controller: controller.signal,
                      headers: {
                        'x-token': auth.accessToken
                      }
                  })
              }
              updatePedido();
              setSent( true );
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          } catch (error) {
              console.error( error );
              if ( error.response.data?.error?.name === 'TokenExpiredError' ) {
                navigate( '/login', { state: { from: location }, replace: true } );
              } 
          }          
      }
    }


    useEffect(() => {
        setIsLoading( true );
        getTecnicos();
        setIsLoading( false );
    }, [])
    

    return (
        <>
            { isLoading
                ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
                : sent
                    ? <Alert variant='success'>El pedido ha sido actualizado</Alert>
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
                                onChange={ e=> setField('correo', e.target.value) } 
                                placeholder="Indica el lugar donde quieres que se haga tu pedido en caso de ser a domicilio"
                            />      
                            <Form.Control.Feedback type='invalid'> { errors.lugar_entrega } </Form.Control.Feedback>                  
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-correo">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control 
                                onChange={ e=> setField('costo', e.target.value) } 
                                required
                                isInvalid={ !!errors.costo }
                            />
                            <Form.Control.Feedback type='invalid'> { errors.costo } </Form.Control.Feedback>
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
            
                        <Form.Group className="mb-3" controlId="registroform-correo">
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

                        <Button variant="outline-primary" clas type="submit">
                            Actualizar
                        </Button>        
                    </Form>
            
        </>
    )
}
