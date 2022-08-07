import React from 'react'

import RegistroForm from '../components/RegistroForm'

import { Container } from 'react-bootstrap'

export default function Registro() {
  return (
    <Container className="mt-4 mb-4">
        <h3>Registrate</h3>        
        <p>Llena los campos con los datos correspondientes para crear una cuenta</p>
        <hr />
        <RegistroForm></RegistroForm>
    </Container>
  )
}
