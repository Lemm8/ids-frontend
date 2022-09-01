import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AcercaDe from './pages/AcercaDe';
import Contactanos from './pages/Contactanos';
import Servicio from './pages/Servicio';
import Registro from './pages/Registro';
import Login from './pages/Login';
import MisPedidos from './pages/MisPedidos';
import RequireAuth from './components/RequireAuth';
import NoAutorizado from './pages/NoAutorizado';
import NuevoPedido from './pages/NuevoPedido';
import ActualizarPedido from './pages/ActualizarPedido';

import PersistLogin from './components/PersistLogin';

import { Route, Routes } from 'react-router-dom';
import MisFinanzas from './pages/MisFinanzas';

function App() {    

  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>

          {/* RUTAS PUBLICAS */}

          {/* HOME */}
          <Route exact path="/" element={<Home />}></Route>
          {/* ACERCA DE */}
          <Route exact path="/acercade" element={<AcercaDe />}></Route>
          {/* CONTACTANOS */}
          <Route exact path='/contactanos' element={<Contactanos />}></Route>
          {/* SERVICIO */}
          <Route exact path='/servicio/:id' element={<Servicio />}></Route>
          {/* LOGIN */}
          <Route exact path='/login' element={<Login />}></Route>
          {/* REGISTRO */}
          <Route exact path='/registro' element={<Registro />}></Route>
          {/* USUARIO NO AUTORIZADO */}
          <Route exact path='/noautorizado' element={<NoAutorizado />}></Route>



          {/* RUTAS PROTEGIDAS */}

          {/* PERSIST LOGIN */}
          <Route element={<PersistLogin />}>

            {/* INICIO (USUARIO) */}
            <Route element={<RequireAuth allowedRoles={['admin', 'tecnico', 'cliente']} />}>
              <Route exact path='/mispedidos' element={<MisPedidos />}></Route>
            </Route>
            {/* ADMIN DASHBOARD */}
            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route exact path='/misfinanzas' element={<MisFinanzas />}></Route>
            </Route>
            {/* NUEVO PEDIDO CLIENTE */}
            <Route element={<RequireAuth allowedRoles={['admin', 'cliente', 'tecnico']} />}>
              <Route exact path='/nuevopedido' element={<NuevoPedido />}></Route>
            </Route>
            {/* AACTUALIZAR PEDIDO */}
            <Route element={<RequireAuth allowedRoles={['admin', 'tecnico']} />}>
              <Route exact path='/actualizarpedido/:id' element={<ActualizarPedido />}></Route>
            </Route>

          </Route>

        </Routes>
      
      </div>
      <Footer />
    </div>
  );
}

export default App;
