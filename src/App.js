import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './components/Invitation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:nombre" element={<Invitation />} /> {/* Ruta dinámica para el nombre */}
      </Routes>
    </Router>
  );
}

export default App;