import React from 'react';

import { Container } from 'react-bootstrap'

import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <Container className="mt-4 mb-4">
        <h3>Iniciar Sesión</h3>
        <p>Llena los campos con los datos de tu cuenta para iniciar sesión</p>
        <hr />
        <LoginForm></LoginForm>
    </Container>
  )
}
