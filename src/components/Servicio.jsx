import React, { useState } from 'react'
import '../style/servicio-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

export default function Servicio({ servicio }) {

  const [image, setImage] = useState("../imgs/cableadoestructurado.png")

  const renderImage = ( nombre ) => {
    switch (nombre) {
      case "Cableado":        
        return <img className='img-servicio' src={require("../imgs/cableadoestructurado.png")} alt="Servicio Logo" />;
      case "Telefonía IP":      
        return <img className='img-servicio' src={require("../imgs/telefonia.png")} alt="Servicio Logo" />;;
      case "Soporte Técnico":      
        return <img className='img-servicio' src={require("../imgs/simplePc.png")} alt="Servicio Logo" />;;
      case "Videovigilancia":      
      return <img className='img-servicio' src={require("../imgs/camera-icon.png")} alt="Servicio Logo" />;;
      case "Cercas Eléctricas":        
        return <img className='img-servicio' src={require("../imgs/cercas.png")} alt="Servicio Logo" />;;
    }
  }

  return (
    <Link to={`/servicio/${servicio.id}`}>
      <div className='container-servicios'> 
          <div className='hexagon-servicio'>
              <span className='contenido-servicio'>
                { renderImage( servicio.nombre ) }
                  {/* <img className='img-servicio' src={require(image)} alt="Servicio Logo" /> */}
                <p className='titulo-servicio'>{servicio.nombre}</p>
              </span>
          </div>
      </div>
    </Link>        
  )
}
