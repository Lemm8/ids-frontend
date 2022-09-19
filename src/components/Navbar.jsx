import React, { useEffect, useState } from 'react';
import '../style/navbar-style.css';

import { Button, Nav, Navbar as NavigationBar, NavDropdown } from 'react-bootstrap';

import { NavLink, Link, useNavigate } from 'react-router-dom';

import useAuth from "../hooks/useAuth";

import useLogout from '../hooks/useLogout';

import { axiosPrivate } from '../api/api';

export default function Navbar() {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();

    const [servicios, setServicios] = useState([]);

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

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <NavigationBar scrolling fixed="top" bg="dark"  variant="dark" className='justify-content-between' sticky='top' expand="sm" collapseOnSelect >            
            <NavigationBar.Brand as={NavLink} to="/">
                <img className='navbar-logo' src={require("../imgs/logo.png")} alt="IDS-logo" />
            </NavigationBar.Brand>
            
            <NavigationBar.Toggle />
            <NavigationBar.Collapse>
                <Nav className="ms-auto">
                    { auth?.usuario 
                        ? <><Nav.Item>Bienvenido</Nav.Item><Nav.Link as={Link} to='/mispedidos'> Pedidos </Nav.Link></>
                        : <></> }
                    { auth?.rol === 'admin' 
                        ? <><Nav.Link as={Link} to='/registrotecnico'> Registrar Tecnico </Nav.Link></>
                        : <></> }          
                    <NavDropdown title="Servicios" >
                        { servicios.map( servicio => <NavDropdown.Item as={Link} to={`/servicio/${servicio.id}`}>{servicio.nombre}</NavDropdown.Item> ) }
                    </NavDropdown>
                    <Nav.Link as={Link} to='/acercade'> Acerca de </Nav.Link>
                    <Nav.Link as={Link} to='/contactanos'> Contáctanos </Nav.Link>
                    { auth?.usuario 
                        ? <><Button onClick={signOut} variant="outline-primary" >Cerrar Sesión</Button></>
                        : <>
                            <Nav.Link as={Link} to='/login'> Iniciar Sesión </Nav.Link>
                            <Button as={Link} to="/registro" variant="outline-primary" >Registrarse</Button></> }
                </Nav> 
            </NavigationBar.Collapse>                
        </NavigationBar>
  )
}
