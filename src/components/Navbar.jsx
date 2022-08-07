import React from 'react';
import '../style/navbar-style.css';

import { Button, Nav, Navbar as NavigationBar, NavDropdown } from 'react-bootstrap';

import { NavLink, Link, useNavigate } from 'react-router-dom';

import useAuth from "../hooks/useAuth";

import useLogout from '../hooks/useLogout';

export default function Navbar() {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <NavigationBar scrolling fixed="top" bg="dark"  variant="dark" className='justify-content-between' sticky='top' expand="sm" collapseOnSelect >
            
            <NavigationBar.Brand as={NavLink} to="/">
                <img className='navbar-logo' src={require("../imgs/logo.png")} alt="IDS-logo" />
                {/* <a href="/"><img className='navbar-logo' src={require("../imgs/logo.png")} alt="IDS-logo" /></a> */}
            </NavigationBar.Brand>
            

            <NavigationBar.Toggle />
            <NavigationBar.Collapse>
                <Nav className="ms-auto">
                    { auth?.usuario 
                        ? <Nav.Link as={Link} to='/mispedidos'> Mis Pedidos </Nav.Link>
                        : <></> }
                    { auth?.rol === 'admin' 
                        ? <Nav.Link as={Link} to='/misfinanzas'> Mis Finanzas </Nav.Link>
                        : <></> }          
                    <NavDropdown title="Servicios" >
                        <NavDropdown.Item as={Link} to="/servicio/1">Servicio1</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/servicio/2">Servicio2</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/servicio/3">Servicio3</NavDropdown.Item>
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
