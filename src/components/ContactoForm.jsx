import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function ContactoForm() {

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

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
        const { nombre, correo, mensaje } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR NOMBRE
        if ( !nombre || nombre ==='' ) newErrors.nombre = 'El nombre es obligatorio';
        else if ( nombre.length > 40 ) newErrors.nombre = 'El nombre es demasiado largo';

        // VALIDAR CORREO
        if ( !correo || correo === '' ) newErrors.correo = 'EL correo es obligatorio';
        else if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( correo )) ) newErrors.correo = 'El formato de correo no es válido';

        // VALIDAR MENSAJE
        if ( !mensaje || mensaje === '' ) newErrors.mensaje = 'El mensaje es obligatorio';

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
            alert( 'Todo bien!' );
        }
    }

  return (
    <Form onSubmit={handleSubmit} className="contacto-form shadow-lg p-3">

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

        <Form.Group className="mb-3" controlId="form-mensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control 
                onChange={ e=> setField('mensaje', e.target.value) }
                as="textarea" 
                rows={10} 
                placeholder="Escribenos tu duda en este campo" 
                isInvalid={ !!errors.mensaje }
            />
            <Form.Control.Feedback type='invalid'> { errors.mensaje } </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
            Enviar
        </Button>

    </Form>
  )
}
