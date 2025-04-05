import React, { useState, useEffect, useRef } from 'react';
 import { motion } from 'framer-motion';
 import axios from 'axios';  
import { useParams } from 'react-router-dom';
import arribaImage from '../assets/arriba.png';
import abajoImage from '../assets/abajo.png';
import abejitaImage from '../assets/abejita.png';
import abejitaImage2 from '../assets/abejita2.png';
import decorImage from '../assets/decor.png';
import hijadisfrazada from '../assets/hijadisfrazadamejor.png';
import song from '../assets/background-song.mp3';
import locationIcon from '../assets/location.png';
import usuario from '../assets/usuario.png';
import './Invitation.css';
import flordecoImage from '../assets/flordeco.png';
import barrildecoImage from '../assets/barril.png';

const Invitation = () => {
  const { nombre } = useParams();
  const [invitacion, setInvitacion] = useState({ nombre: '', asiste: null });
  const [mensaje, setMensaje] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const backendUrl = 'https://abejita-backend.onrender.com';

  const audioRef = useRef(null);

  const handleStartInteraction = () => {
    const audio = audioRef.current;
    if (audio && !hasPlayed) {
      audio.play()
        .then(() => {
          console.log('Audio iniciado tras interacción explícita');
          setHasPlayed(true);
          setShowOverlay(false);
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            setHasPlayed(false);
          }, 60 * 1000);
        })
        .catch((error) => {
          console.error('Error al reproducir el audio tras interacción:', error);
        });
    }
  };

  useEffect(() => {
    const fetchInvitacion = async (retryCount = 0) => {
      if (nombre) {
        try {
          setLoading(true);
          const response = await axios.get(`${backendUrl}/invitacion/${nombre}`, {
            timeout: 30000, // Aumentado a 30 segundos
          });
          const data = response.data.asiste === undefined || response.data.asiste === null
            ? { nombre: nombre, asiste: null }
            : response.data;
          setInvitacion(data);
          console.log('Invitación cargada:', data);
        } catch (error) {
          console.error('Error fetching invitation:', error);
          if (retryCount < 1) { // Reducido a 1 reintento
            console.log(`Reintentando... Intento ${retryCount + 1}`);
            setTimeout(() => fetchInvitacion(retryCount + 1), 5000);
          } else {
            setInvitacion({ nombre: nombre, asiste: null });
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No se proporcionó un nombre en la URL');
        setLoading(false);
      }
    };
    fetchInvitacion();
  }, [nombre]);

  const confirmarAsistencia = async (asiste) => {
    if (nombre) {
      try {
        setLoading(true);
        await axios.post(`${backendUrl}/invitacion/${nombre}/confirmar`, { asiste });
        setMensaje('¡Confirmación enviada!');
        const response = await axios.get(`${backendUrl}/invitacion/${nombre}`);
        const updatedData = response.data.asiste === undefined || response.data.asiste === null
          ? { nombre: nombre, asiste: null }
          : response.data;
        setInvitacion(updatedData);
      } catch (error) {
        console.error('Error confirming attendance:', error);
        setMensaje('Error al confirmar');
      } finally {
        setLoading(false);
      }
    } else {
      setMensaje('No se proporcionó un nombre válido');
    }
  };

  const calculateTimeLeft = () => {
    const eventDate = new Date('2025-04-05T15:00:00');
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

  useEffect(() => {
    console.log('Estado de invitacion:', invitacion);
  }, [invitacion]);

  return (
    <div className="invitation-container">
      {showOverlay && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overlay-content">
            <h2>¡Bienvenido/a!</h2>
            <p>Toca aquí para comenzar la experiencia</p>
            <motion.button
              onClick={handleStartInteraction}
              onTouchStart={handleStartInteraction}
              className="start-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Comenzar
            </motion.button>
          </div>
        </motion.div>
      )}

      <audio ref={audioRef}>
        <source src={song} type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <div className="decor-top-wrapper">
        <motion.img
          src={arribaImage}
          alt="Decoración superior"
          className="decor-top-image"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
      </div>

      <div className="title-wrapper">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Puedes agregar texto aquí si lo deseas, por ejemplo: "Invitación" */}
        </motion.h1>
        <motion.h2
          className="subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Mi primer añito
        </motion.h2>
      </div>

      <div className="decor-wrapper">
        <motion.img
          src={decorImage}
          alt="Decoración"
          className="decor-image"
          animate={{ x: [0, 30, 0], y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          loading="lazy"
        />
      </div>
      <p className="invite-text">
        {nombre
          ? `${nombre.replace('_', ' ').toUpperCase()}, TENEMOS EL HONOR DE INVITARTE AL PRIMER AÑITO DE NUESTRA PRINCESA 🎉`
          : 'TENEMOS EL HONOR DE INVITARTE AL PRIMER AÑITO DE NUESTRA PRINCESA  🎉'}
      </p>

      <div className="hija-wrapper">
        <motion.img
          src={hijadisfrazada}
          alt="Cumpleañera"
          className="hija-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.img
          src={flordecoImage}
          alt="flor decorativo izquierda"
          className="flordeco-image left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.img
          src={flordecoImage}
          alt="flor decorativo izquierda"
          className="flordeco-image left2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.img
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.img
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.img
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
      </div>

      <div className="name-date-wrapper">
        <h3 className="name">Charlotte Suarez Armijos</h3>
        <div className="decorated-date-wrapper">
          <motion.img
            src={barrildecoImage}
            alt="Barril decorativa izquierda"
            className="barrildeco-image left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
          <motion.div
            className="date-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="date-block">
              <div className="date-column">
                <span className="date-day">Sábado</span>
                <span className="date-time">15:00</span>
              </div>
              <span className="date-separator"> | </span>
              <span className="date-number">05</span>
              <span className="date-separator"> | </span>
              <div className="date-column">
                <span className="date-month">Abril</span>
                <span className="date-year">2025</span>
              </div>
            </div>
          </motion.div>
          <motion.img
            src={barrildecoImage}
            alt="barril decorativa derecha"
            className="barrildeco-image right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
        </div>
      </div>

      {timeLeft && (
        <motion.div
          className="counter-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="counter-content">
            <p>¿Cuánto falta?</p>
            <div className="time-blocks">
              <div className="time-block">
                <span className="time-number">{timeLeft.dias || 0}</span>
                <span className="time-label">Días</span>
              </div>
              <div className="time-block">
                <span className="time-number">{timeLeft.horas || 0}</span>
                <span className="time-label">Horas</span>
              </div>
              <div className="time-block">
                <span className="time-number">{timeLeft.minutos || 0}</span>
                <span className="time-label">Minutos</span>
              </div>
              <div className="time-block">
                <span className="time-number">{timeLeft.segundos || 0}</span>
                <span className="time-label">Segundos</span>
              </div>
            </div>
          </div>
          <div className="abejita-wrapper">
            <motion.img
              src={abejitaImage}
              alt="Abejita Chiquita"
              className="abejita-animation"
              animate={{ x: [30, -30, 30], y: [-5, 5, -5], rotate: [0, 5, -5, 0] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "easeInOut" },
                y: { repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" },
                rotate: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "easeInOut" },
              }}
              loading="lazy"
            />
          </div>
        </motion.div>
      )}

      <div className="location-container">
        <div className="abejita-wrapper2">
          <motion.img
            src={abejitaImage2}
            alt="Abejita Chiquita2"
            className="abejita-animation2"
            animate={{ x: [-30, 30, -30], y: [-5, 5, -5], rotate: [0, 5, -5, 0] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 2.5, ease: "easeInOut" },
              y: { repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" },
              rotate: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "easeInOut" },
            }}
            loading="lazy"
          />
        </div>
        <div className="location-info">
          <p className="location-title">Dirección:</p>
          <p className="location-address">Samanes 7 Mz 2246 Villa 6</p>
          <div className="button-container">
          <a  
    href="https://www.google.com/maps/place/2%C2%B006'41.8%22S+79%C2%B054'38.1%22W/@-2.1116078,-79.9131485,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-2.1116078!4d-79.9105736?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"   
    target="_blank"  
    rel="noopener noreferrer"  
    className="map-link"  
>  
    <img src={locationIcon} alt="Ubicación" className="icon" /> Ver ubicación  
</a>  
            {loading ? (
              <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>Cargando tu invitación...</p>
                <motion.img
                  src={abejitaImage}
                  alt="Abejita cargando"
                  className="abejita-loading"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ) : (
              <div className="confirmation">
                {invitacion.asiste === null ? (
                  <motion.button
                    onClick={() => confirmarAsistencia(true)}
                    className="yes-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={usuario} alt="Ubicación" className="icon" /> Confirma tu asistencia
                  </motion.button>
                ) : (
                  <p className="status">Estado: {invitacion.asiste ? 'Asistirá' : 'No asistirá'}</p>
                )}
                {mensaje && <p className="message">{mensaje}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decor-bottom-wrapper">
        <motion.img
          src={abajoImage}
          alt="Decoración inferior"
          className="decor-bottom-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Invitation;