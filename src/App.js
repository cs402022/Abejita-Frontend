import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [invitacion, setInvitacion] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const backendUrl = 'https://abejita-backend.onrender.com';

  // Consultar invitación
  const consultarInvitacion = async () => {
    try {
      const response = await axios.get(`${backendUrl}/invitacion/${nombre}`);
      setInvitacion(response.data);
      setMensaje('');
    } catch (error) {
      setMensaje('Invitación no encontrada');
      setInvitacion(null);
    }
  };

  // Confirmar asistencia
  const confirmarAsistencia = async (asiste) => {
    try {
      await axios.post(`${backendUrl}/invitacion/${nombre}/confirmar`, { asiste });
      setMensaje('¡Confirmación enviada!');
      consultarInvitacion(); // Actualiza la invitación
    } catch (error) {
      setMensaje('Error al confirmar');
    }
  };

  return (
    <div className="App">
      <h1>Invitación a la Fiesta</h1>
      <div>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button onClick={consultarInvitacion}>Consultar</button>
      </div>
      {invitacion && (
        <div>
          <h2>Hola, {invitacion.nombre}!</h2>
          <p>Estado: {invitacion.asiste === null ? 'Pendiente' : invitacion.asiste ? 'Asistirá' : 'No asistirá'}</p>
          {invitacion.asiste === null && (
            <div>
              <button onClick={() => confirmarAsistencia(true)}>Sí, asistiré</button>
              <button onClick={() => confirmarAsistencia(false)}>No, no asistiré</button>
            </div>
          )}
        </div>
      )}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default App;