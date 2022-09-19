import React, { useState } from 'react'

import { Button, Form, Alert } from 'react-bootstrap';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import useAuth from "../hooks/useAuth.jsx";

import LoadingSpinner from './LoadingSpinner';

export default function RegistrarTecnicoForm() {

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
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

    const findFormErrors = () => {
        // CAMPOS
        const { nombre, apellidos, correo, telefono, direccion, curp, password1, password2 } = form;
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

        // VALIDAR CURP
        if ( !curp || !curp === '' ) newErrors.curp = 'El CURP es obligatorio';
        else if ( curp.length !== 18 ) newErrors.curp = 'El CURP debe tener 18 caractéres'

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
                setIsLoading( true )        
                const controller = new AbortController();
                const registro = async () => {
                    const response = await axiosPrivate.post( `/tecnicos`, {
                        correo: form.correo,
                        nombre: form.nombre,
                        apellidos: form.apellidos,
                        telefono: form.telefono,
                        direccion: form.direccion,
                        contrasena: form.password1, 
                        curp: form.curp,
                        is_admin: isAdmin
                    }, {
                        controller: controller.signal,
                        headers: {
                            'x-token': auth.accessToken
                        }
                    })
                }
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });                   
                registro();
                setIsLoading( false );
                setSent( true )
            } catch (error) {
                console.log( error )
            }
        }
    }


  return (
    <>
        { sent
            ? isLoading
                ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
                : <Alert variant='success'>Se ha creado la cuenta con éxito</Alert>
            : <></>
        }
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
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-curp">
            <Form.Label>CURP</Form.Label>
            <Form.Control 
                onChange={ e=> setField('curp', e.target.value) } 
                required 
                placeholder="CURP del técnico" 
                isInvalid={ !!errors.curp }
            />
            <Form.Control.Feedback type='invalid'> { errors.curp } </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-is_admin">
            <Form.Check
                label='Adminstrador'
                type='checkbox'                
                checked={ isAdmin }
                onChange={ e => setIsAdmin( e.target.checked ) }
            />
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
    </>
  )
}
