import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Cambia Switch por Routes
import Invitation from './components/Invitation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:nombre" element={<Invitation />} /> {/* Sintaxis actualizada con element */}
      </Routes>
    </Router>
  );
}

export default App;