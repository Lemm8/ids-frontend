import React from 'react'

import { Container } from 'react-bootstrap';

import RegistrarTecnicoForm from '../components/RegistrarTecnicoForm';

export default function RegistroTecnico() {
  return (
    <Container className="mt-4 mb-4">
        <h3>Registrar Tecnico</h3>        
        <p>Llena los campos con los datos correspondientes para crear una cuenta de un tecnico</p>
        <hr />
        <RegistrarTecnicoForm></RegistrarTecnicoForm>
    </Container>
  )
}
