// src/hooks/useInvitation.js
import { useState, useEffect } from 'react';

const useInvitation = (nombre, backendUrl, httpService) => {
  const [invitacion, setInvitacion] = useState({ nombre: '', asiste: null });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitacion = async () => {
      if (!nombre) return;
      setLoading(true);
      try {
        const data = await httpService.get(`${backendUrl}/invitacion/${nombre}`);
        setInvitacion(data.asiste === null ? { nombre, asiste: null } : data);
      } catch (error) {
        setInvitacion({ nombre, asiste: null });
      } finally {
        setLoading(false);
      }
    };
    fetchInvitacion();
  }, [nombre, backendUrl, httpService]);

  const confirmarAsistencia = async (asiste) => {
    if (!nombre) return;
    setLoading(true);
    try {
      await httpService.post(`${backendUrl}/invitacion/${nombre}/confirmar`, { asiste });
      const data = await httpService.get(`${backendUrl}/invitacion/${nombre}`);
      setInvitacion(data.asiste === null ? { nombre, asiste: null } : data);
      setMensaje('¡Confirmación enviada!');
    } catch (error) {
      setMensaje('Error al confirmar');
    } finally {
      setLoading(false);
    }
  };

  return { invitacion, mensaje, loading, confirmarAsistencia };
};

export default useInvitation;