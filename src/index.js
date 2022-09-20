import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { AuthProvider } from './context/AuthProvider';
import { HashRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} ></Route>
        </Routes>          
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

