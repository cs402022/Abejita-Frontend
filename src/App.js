import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import { HelmetProvider } from 'react-helmet-async'; // Importar HelmetProvider
import Invitation from './components/Invitation';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/:nombre" element={<Invitation />} /> {/* Ruta dinámica para el nombre */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;