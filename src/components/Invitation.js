import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import abejitaImage from '../assets/abejita.png';
import decorImage from '../assets/decor.png';
import './Invitation.css';

const Invitation = () => {
  const { nombre } = useParams();
  const [invitacion, setInvitacion] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const backendUrl = 'https://abejita-backend.onrender.com';

  // Consultar invitación
  useEffect(() => {
    const fetchInvitacion = async () => {
      if (nombre) {
        try {
          const response = await axios.get(`${backendUrl}/invitacion/${nombre}`);
          setInvitacion(response.data);
          console.log('Invitación cargada:', response.data); // Depuración
        } catch (error) {
          console.error('Error fetching invitation:', error);
          setInvitacion({ nombre: nombre, asiste: null }); // Simula invitación si falla
        }
      } else {
        console.log('No se proporcionó un nombre en la URL');
      }
    };
    fetchInvitacion();
  }, [nombre]);

  // Confirmar asistencia
  const confirmarAsistencia = async (asiste) => {
    if (nombre) {
      try {
        await axios.post(`${backendUrl}/invitacion/${nombre}/confirmar`, { asiste });
        setMensaje('¡Confirmación enviada!');
        const response = await axios.get(`${backendUrl}/invitacion/${nombre}`);
        setInvitacion(response.data);
      } catch (error) {
        console.error('Error confirming attendance:', error);
        setMensaje('Error al confirmar');
      }
    } else {
      setMensaje('No se proporcionó un nombre válido');
    }
  };

  // Contador hasta 5 de abril de 2025, 14:00
  const calculateTimeLeft = () => {
    const eventDate = new Date('2025-04-05T14:00:00');
    const now = new Date();
    const difference = eventDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="invitation-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        La dulce espera está por terminar! 🌼
      </motion.h1>
      <motion.img
        src={abejitaImage}
        alt="Abejita Chiquita"
        className="abejita-animation"
        animate={{ x: [0, 50, 0], y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <h2 className="name">Dayanna Suarez</h2>
      <p className="invite-text">Te invitamos a celebrar mi primer cumple...</p>
      <div className="date-container">
        {/* Restauramos tu diseño personalizado */}
      </div>
      {timeLeft && (
        <div className="counter">
          <p>¡Cuánto falta?</p>
          <div className="time">
            <span>{timeLeft.dias || 0} Días</span>
            <span>{timeLeft.horas || 0} Horas</span>
            <span>{timeLeft.minutos || 0} Minutos</span>
            <span>{timeLeft.segundos || 0} Segundos</span>
          </div>
          <img src={decorImage} alt="Decoración" className="decor-image" />
        </div>
      )}
      <div className="location">
        <p>Dirección: Samanes 7 mz 1234 villa 1234</p>
        <a
          href="https://www.google.com/maps?q=-2.1594111999999996,-79.9244288"
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
        >
          Abrir en Google Maps
        </a>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127583.51969298511!2d-79.9244288!3d-2.1594111999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1741543233116!5m2!1ses!2sec&marker=2.1594111999999996,-79.9244288"
          width="400"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {invitacion && (
        <div className="confirmation">
          <p className="status">
            Estado: {invitacion.asiste === null ? 'Pendiente' : invitacion.asiste ? 'Asistirá' : 'No asistirá'}
          </p>
          {invitacion.asiste === null && (
            <div className="buttons">
              <motion.button
                onClick={() => confirmarAsistencia(true)}
                className="yes-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Sí, asistiré
              </motion.button>
              <motion.button
                onClick={() => confirmarAsistencia(false)}
                className="no-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                No, no asistiré
              </motion.button>
            </div>
          )}
          {mensaje && <p className="message">{mensaje}</p>}
        </div>
      )}
    </div>
  );
};

export default Invitation;