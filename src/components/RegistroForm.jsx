import React, { useState } from 'react'

import { Button, Form, Container } from 'react-bootstrap';

import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { login } from '../api/auth';

export default function RegistroForm() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

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

    const findFormErrors = () => {
        // CAMPOS
        const { nombre, apellidos, correo, telefono, direccion, password1, password2 } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR NOMBRE
        if ( !nombre || nombre ==='' ) newErrors.nombre = 'El nombre es obligatorio';
        else if ( nombre.length > 40 ) newErrors.nombre = 'El nombre es demasiado largo';

        // VALIDAR APELLIDOS
        if ( !apellidos || apellidos ==='' ) newErrors.apellidos = 'Los apellidios son obligatorios';
        else if ( apellidos.length > 80 ) newErrors.apellidos = 'Los apellidos son demasiado largos';

        // VALIDAR CORREO
        if ( !correo || correo === '' ) newErrors.correo = 'EL correo es obligatorio';
        else if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( correo )) ) newErrors.correo = 'El formato de correo no es válido';

        // VALIDAR TELEFONO
        if ( !telefono || telefono === '' ) newErrors.telefono = 'El telófono es obligatorio';
        else if ( !( /^[0-9]*$/.test( telefono ) ) ) newErrors.telefono = 'Solo se permiten dígitos numéricos';
        else if ( telefono.length > 15 ) newErrors.telefono = 'El telefono no puede ser mayor de 15 dígitos';

        // VALIDAR DIRECCION
        if ( !direccion || direccion === '' ) newErrors.direccion = 'La dirección es obligatoria';
        else if ( direccion.length > 150 ) newErrors.direccion = 'La dirección es demasiado larga';

        // VALIDAR CONTRASEÑAS
        if ( !password1 || !password2 || password1 === '' || password2 === '' ) newErrors.password = 'La contraseña es obligatoria'
        else if ( password1 !== password2 ) newErrors.password = 'Las contraseñas no coinciden';

        return newErrors;

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
                const controller = new AbortController();
                const registro = async () => {
                    const responseRegistro = await axiosPrivate.post( `/clientes`, {
                        correo: form.correo,
                        nombre: form.nombre,
                        apellidos: form.apellidos,
                        telefono: form.telefono,
                        direccion: form.direccion,
                        contrasena: form.password1
                    }, {
                        controller: controller.signal
                    });
                }                                
                registro();
                alert( 'Se creo tu cuenta con éxito' )
                navigate( from, { replace: true } );
            } catch (error) {
                console.log( error );
            }
        }
    }


  return (
    <Container>
        <Form onSubmit={handleSubmit} className="registro-form shadow-lg p-3">

        <Form.Group className="mb-3" controlId="form-correo">
            <Form.Label>{'Nombre(s)'}</Form.Label>
            <Form.Control 
                onChange={ e=> setField('nombre', e.target.value) } 
                required 
                placeholder="Tu nombre"
                isInvalid={ !!errors.nombre }
            />
            <Form.Control.Feedback type='invalid'> { errors.nombre } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-correo">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
                onChange={ e=> setField('apellidos', e.target.value) } 
                required 
                placeholder="Tus apellidos"
                isInvalid={ !!errors.apellidos }
            />
            <Form.Control.Feedback type='invalid'> { errors.apellidos } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-correo">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
                onChange={ e=> setField('correo', e.target.value) } 
                required 
                type="email" 
                placeholder="Tu correo" 
                isInvalid={ !!errors.correo }
            />
            <Form.Control.Feedback type='invalid'> { errors.correo } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registroform-correo">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control  
                onChange={ e=> setField('telefono', e.target.value) } 
                required  
                placeholder="No. de telefono" 
                isInvalid={ !!errors.telefono }
            />
            <Form.Control.Feedback type='invalid'> { errors.telefono } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-contra">
            <Form.Label>Dirección</Form.Label>
            <Form.Control 
                onChange={ e=> setField('direccion', e.target.value) } 
                required 
                placeholder="Direccion" 
                isInvalid={ !!errors.direccion }
            />
            <Form.Control.Feedback type='invalid'> { errors.direccion } </Form.Control.Feedback>
            <Form.Text className="text-muted">
                Indica la direccion en donde quieres que se entreguen tus pedidos si es que así se requiere
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registroform-contra">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
                onChange={ e=> setField('password1', e.target.value) } 
                required
                type="password" 
                placeholder="Contraseña"
                isInvalid={ !!errors.password }
            />
            <Form.Control.Feedback type='invalid'> { errors.password } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-contra">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
                onChange={ e=> setField('password2', e.target.value) } 
                required
                type="password" 
                placeholder="Contraseña"
                isInvalid={ !!errors.password }
            />
            <Form.Control.Feedback type='invalid'> { errors.password } </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-primary" clas type="submit">
            Confirmar
        </Button>

        </Form>
    </Container>
  )
}
