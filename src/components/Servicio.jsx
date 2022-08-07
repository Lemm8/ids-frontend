import React from 'react'
import '../style/servicio-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Servicio() {
  return (
    <div className='container-servicios'> 
        <div className='hexagon-servicio'>
            <span className='contenido-servicio'>
                <img className='img-servicio' src={require("../imgs/cableadoestructurado.png")} alt="Servicio Logo" />
                <p className='titulo-servicio'>Servicio</p>
            </span>
        </div>
    </div>        
  )
}
