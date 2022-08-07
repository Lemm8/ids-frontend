import React, { useState } from 'react'
import '../style/banner-style.css';
import { Carousel, Col, Button } from 'react-bootstrap';
// import { Button, Nav, Navbar as NavigationBar, NavDropdown } from 'react-bootstrap';

export default function Banner() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const breakpoint = 850;

  React.useEffect(() => {
    const handleResizeWindow = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
     window.addEventListener("resize", handleResizeWindow);
     return () => {
       window.removeEventListener("resize", handleResizeWindow);
     };
   }, []);
 

  return (
    <Carousel controls={false}>
        <Carousel.Item className="banner-item">
            <img className="d-block w-100" src={require("../imgs/banner3.jpg")} alt="First slide"/> 
            <Carousel.Caption className='carousel-caption'>
              <Col xs={12}>
                { width > breakpoint && height < breakpoint ? (
                  <>
                    <h2>Bienvenido a <span className='ids-banner-text'>IDS</span> </h2>
                    <hr />
                    <p>Brindamos <span className='ids-banner-text'>servicios tecnológicos</span> de alta calidad. Instalación de cámaras, cableado estructurado, reparación de equipo y más.</p>
                    <Button href="/" variant="outline-primary">Ver Servicios</Button>
                  </>                  
                ) :(
                  <div className="caption-small">
                    <h2>Bienvenido a <span className='ids-banner-text'>IDS</span></h2>
                    <Button href="/" variant="outline-primary">Ver Servicios</Button>
                  </div> 
                )}                
              </Col>              
            </Carousel.Caption>      
        </Carousel.Item>
    </Carousel>
  )
}
