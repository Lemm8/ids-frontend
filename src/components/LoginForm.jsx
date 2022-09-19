import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { login } from '../api/auth';



export default function LoginForm() {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [c, setC] = useState(0);    

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
        const { correo, password } = form;
        // OBJETO PARA GUSRDAR ERRORES
        const newErrors = {};

        // VALIDAR CORREO
        if ( !correo || correo === '' ) newErrors.correo = 'EL correo es obligatorio';
        else if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( correo )) ) newErrors.correo = 'El formato de correo no es válido';

        // VALIDAR CONTRASEÑA
        if ( !password || password === '' ) newErrors.password = 'La contraseña es obligatoria';      

        return newErrors;

    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();        
        // VER ERRORES
        const newErrors = findFormErrors();
        // VER SI HAY ERRORES
        if ( Object.keys( newErrors ).length > 0 ) {            
            setErrors( newErrors );
        } else {
            const response = await login( form.correo, form.password );
            
            if ( !response.success ) {
                setC(c+1);
                setLoggedIn( false );
                setLoginError( response.res.msg );
            } else {
                // GUARDAR CREDENCIALES GLOBALMENTE
                const accessToken = response.res.data.token;
                const usuario = response.res.data.usuario;
                const info = response.res.data.info;
                const rol = response.res.data.rol;                
                setAuth({ usuario, info, accessToken, rol });

                setLoggedIn( true );
                navigate( from, { replace: true } );
                alert( 'Haz iniciado sesión' )
            }        
        }
    }


    const togglePersist = () => {
        setPersist( prev => !prev );
    }


    useEffect(() => {
        localStorage.setItem( "persist", persist );
    }, [ persist ])


    return (
        <Container>            
            <Form onSubmit={handleSubmit} className="login-form shadow-lg p-3">

            { !loggedIn && c > 0
                ? <Alert variant="danger">{ loginError }</Alert>
                : <></> }

            <Form.Group className="mb-3" controlId="loginform-correo">
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

            <Form.Group className="mb-3" controlId="loginform-contra">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    onChange={ e=> setField('password', e.target.value) } 
                    required
                    type="password" 
                    placeholder="Contraseña"
                    isInvalid={ !!errors.password }
                />
                <Form.Control.Feedback type='invalid'> { errors.password } </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginform-persist">
                <Form.Check 
                    type = "checkbox"
                    id = "persist"
                    onChange = { togglePersist }
                    checked = { persist }
                    label = "Recuerdame"
                />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
                Iniciar Sesión
            </Button>
            <hr />
            No tienes una cuenta? <Link to={'/registro'}>Registrate aqui</Link>        

            </Form>
        </Container>
    )
}
