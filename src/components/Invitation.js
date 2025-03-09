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
          console.log('Invitación cargada:', response.data);
        } catch (error) {
          console.error('Error fetching invitation:', error);
          setInvitacion({ nombre: nombre, asiste: null });
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
    <div className="invitation-container" style={{ backgroundColor: '#fff3e6', padding: '20px' }}>
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ color: '#ff9900', textAlign: 'center', fontSize: '32px' }}
      >
        La dulce espera está por terminar! 🌼
      </motion.h1>
      <motion.img
        src={abejitaImage}
        alt="Abejita Chiquita"
        className="abejita-animation"
        animate={{ x: [0, 50, 0], y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ display: 'block', margin: '0 auto', width: '100px' }}
      />
      <h2 className="name" style={{ color: '#ff6699', textAlign: 'center', fontSize: '24px' }}>
        Dayanna Suarez
      </h2>
      <p className="invite-text" style={{ color: '#555', textAlign: 'center', fontSize: '18px' }}>
        Te invitamos a celebrar mi primer cumple...
      </p>
      <motion.div
        className="date-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: '#ffcccc',
          padding: '20px',
          borderRadius: '15px',
          margin: '20px 0',
          textAlign: 'center',
        }}
      >
        <motion.h1
          style={{ color: '#ff6600', fontSize: '28px', marginBottom: '15px' }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¡Estás invitado a una celebración especial!
        </motion.h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            margin: '15px 0',
            color: '#333',
          }}
        >
          <motion.span
            style={{ fontWeight: 'bold', fontSize: '22px', color: '#ff6600' }}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Sábado
          </motion.span>
          <motion.span
            style={{ fontWeight: 'bold', fontSize: '22px', color: '#ff6600' }}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            14:00
          </motion.span>
          <motion.span
            style={{ fontWeight: 'bold', fontSize: '22px', color: '#ff6600' }}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            05
          </motion.span>
          <motion.span
            style={{ fontWeight: 'bold', fontSize: '22px', color: '#ff6600' }}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Abril 2025
          </motion.span>
        </div>
        <motion.p
          style={{ fontSize: '18px', color: '#777', marginTop: '15px' }}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          ¡No faltes, te esperamos con cariño!
        </motion.p>
      </motion.div>
      <hr style={{ border: '1px dashed #ff9999', margin: '20px 0' }} />
      {timeLeft && (
        <motion.div
          className="counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: '#fff3e6', padding: '15px', borderRadius: '10px', textAlign: 'center' }}
        >
          <p style={{ color: '#ff6600', fontSize: '20px' }}>¡Cuánto falta?</p>
          <div className="time" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
            <span style={{ color: '#555', fontSize: '18px' }}>{timeLeft.dias || 0} Días</span>
            <span style={{ color: '#555', fontSize: '18px' }}>{timeLeft.horas || 0} Horas</span>
            <span style={{ color: '#555', fontSize: '18px' }}>{timeLeft.minutos || 0} Minutos</span>
            <span style={{ color: '#555', fontSize: '18px' }}>{timeLeft.segundos || 0} Segundos</span>
          </div>
          <img src={decorImage} alt="Decoración" className="decor-image" style={{ marginTop: '10px', width: '50px' }} />
        </motion.div>
      )}
      <hr style={{ border: '1px dashed #ff9999', margin: '20px 0' }} />
      <div className="location" style={{ textAlign: 'center' }}>
        <p style={{ color: '#ff6600', fontSize: '18px' }}>Dirección: Samanes 7 mz 1234 villa 1234</p>
        <a
          href="https://www.google.com/maps?q=-2.1594111999999996,-79.9244288"
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
          style={{ color: '#ff6699', textDecoration: 'underline', fontSize: '16px' }}
        >
          Abrir en Google Maps
        </a>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127583.51969298511!2d-79.9244288!3d-2.1594111999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1741543233116!5m2!1ses!2sec&marker=2.1594111999999996,-79.9244288"
          width="400"
          height="400"
          style={{ border: '0', borderRadius: '10px', marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <hr style={{ border: '1px dashed #ff9999', margin: '20px 0' }} />
      {invitacion && (
        <motion.div
          className="confirmation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', backgroundColor: '#fff3e6', padding: '15px', borderRadius: '10px' }}
        >
          <p className="status" style={{ color: '#ff6600', fontSize: '18px' }}>
            Estado: {invitacion.asiste === null ? 'Pendiente' : invitacion.asiste ? 'Asistirá' : 'No asistirá'}
          </p>
          {invitacion.asiste === null && (
            <div className="buttons" style={{ marginTop: '10px' }}>
              <motion.button
                onClick={() => confirmarAsistencia(true)}
                className="yes-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ backgroundColor: '#ff9999', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', marginRight: '10px' }}
              >
                Sí, asistiré
              </motion.button>
              <motion.button
                onClick={() => confirmarAsistencia(false)}
                className="no-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ backgroundColor: '#ff9999', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
              >
                No, no asistiré
              </motion.button>
            </div>
          )}
          {mensaje && <p className="message" style={{ color: '#ff6600', marginTop: '10px' }}>{mensaje}</p>}
        </motion.div>
      )}
    </div>
  );
};

export default Invitation;