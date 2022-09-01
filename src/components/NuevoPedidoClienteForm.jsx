import React, { useEffect, useState } from 'react';

import { Button, Form, Alert } from 'react-bootstrap';

import { axiosPrivate } from '../api/api';

import useAuth from "../hooks/useAuth.jsx";

import { useNavigate, useLocation } from 'react-router-dom';

export default function () {

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [servicios, setServicios] = useState([]);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useAuth();

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

    const findFormErrors = () => {
        // CAMPOS
        const { titulo, descripcion, servicio } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR NOMBRE
        if ( !titulo || titulo ==='' ) newErrors.titulo = 'El título es obligatorio';
        else if ( titulo.length > 40 ) newErrors.titulo = 'El titulo es demasiado largo';

        // VALIDAR DESCRIPCION
        if ( !descripcion || descripcion ==='' ) newErrors.apellidos = 'La descripción es obligatoria';

        // VALIDAR SERVICIO
        if ( !servicio || servicio === '' ) newErrors.servicio = 'El servicio es obligatorio';

        return newErrors;

    }

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
              
              const postPedido = async () => {
                const response = await axiosPrivate.post( '/pedidos', {
                    titulo: form.titulo, 
                    descripcion: form.descripcion,
                    costo: 0,
                    lugar_entrega: form.lugar_entrega,
                    cliente: auth.usuario.id,
                    servicio: form.servicio
                }, {
                  headers: {
                      'x-token': auth.accessToken
                    }  
                });
              }            
              postPedido();
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

    return (
        <>
            { sent
                ? <Alert variant='success'>Tu pedido ha sido enviado, ve a la sección de Mis pedidos para verlo</Alert>
                : <></> }
            <Form onSubmit={handleSubmit} className="pedido-form shadow-lg p-3">

            <Form.Group className="mb-3" controlId="form-correo">
                <Form.Label>Título</Form.Label>
                <Form.Control 
                    onChange={ e=> setField('titulo', e.target.value) } 
                    required 
                    placeholder="Asunto del pedido (breve)"
                    isInvalid={ !!errors.titulo }
                />
                <Form.Control.Feedback type='invalid'> { errors.titulo } </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-correo">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    onChange={ e=> setField('descripcion', e.target.value) } 
                    required 
                    as = "textarea"
                    rows = {5}
                    placeholder="Describa el problema o el pedido a detalle"
                    isInvalid={ !!errors.descripcion }
                />
                <Form.Control.Feedback type='invalid'> { errors.descripcion } </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-correo">
                <Form.Label>Lugar de entrega</Form.Label>
                <Form.Control 
                    onChange={ e=> setField('correo', e.target.value) } 
                    placeholder="Indica el lugar donde quieres que se haga tu pedido en caso de ser a domicilio"
                />
                <Form.Text muted>
                    AVISO: En caso de no poner la direccion, tendra que venir a la siguiente direccion a entregarlo y recogerlo:
                    Nueva Reforma #254, entre Riva Palacio y Brecha California, colonia Benito Juarez
                </Form.Text>            
            </Form.Group>

            <Form.Group className="mb-3" controlId="registroform-correo">
                <Form.Label>Servicio</Form.Label>
                <Form.Control
                    as="select"
                    required  
                    isInvalid={ !!errors.servicio }     
                    onChange={ e => setField('servicio', e.target.value) }
                    >                    
                        {servicios.map( servicio => <option key={servicio.id} value={ servicio.id }> { servicio.nombre } </option> )}
                </Form.Control>
                <Form.Control.Feedback type='invalid'> { errors.servicio } </Form.Control.Feedback>
            </Form.Group>

            <Button variant="outline-primary" clas type="submit">
                Enviar solicitud
            </Button>

            </Form>
        </>
    )
}
