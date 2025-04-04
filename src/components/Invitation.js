<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
 import { motion } from 'framer-motion';
>>>>>>> fbc4f0db4ba9fedf6bf94f68003c593bb6e8c76c
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useInvitation from '../hooks/useInvitation';
import useAudio from '../hooks/useAudio';
import useCountdown from '../hooks/useCountdown';
import httpService from '../services/httpService';
import WelcomeOverlay from './WelcomeOverlay';
import AnimatedImage from './AnimatedImage';
import AnimatedCountdown from './AnimatedCountdown';
import LocationSection from './LocationSection';
import '../styles/Invitation.css';
import arribaImage from '../assets/arriba.png';
import abajoImage from '../assets/abajo.png';
import decorImage from '../assets/decor.png';
import hijadisfrazada from '../assets/hijadisfrazadamejor.png';
import song from '../assets/background-song.mp3';
import flordecoImage from '../assets/flordeco.png';
import barrildecoImage from '../assets/barril.png';

const Invitation = () => {
  const { nombre } = useParams();
  const backendUrl = 'https://abejita-backend.onrender.com';
  const { invitacion, mensaje, loading, confirmarAsistencia } = useInvitation(nombre, backendUrl, httpService);
  const { showOverlay, audioRef, handleStartInteraction } = useAudio(song);
  const timeLeft = useCountdown('2025-04-05T15:00:00');

  return (
    <div className="invitation-container">
      <WelcomeOverlay showOverlay={showOverlay} onStart={handleStartInteraction} />
      <audio ref={audioRef}>
        <source src={song} type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <div className="decor-top-wrapper">
        <AnimatedImage
          src={arribaImage}
          alt="Decoración superior"
          className="decor-top-image"
          animationProps={{ initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } }}
        />
      </div>

      <div className="title-wrapper">
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
        <AnimatedImage
          src={decorImage}
          alt="Decoración"
          className="decor-image"
          animationProps={{
            animate: { x: [0, 30, 0], y: [0, 10, 0], rotate: [0, 5, -5, 0] },
            transition: { duration: 4, repeat: Infinity },
          }}
        />
      </div>

      <p className="invite-text">
        {nombre
          ? `${nombre.replace('_', ' ').toUpperCase()}, TENEMOS EL HONOR DE INVITARTE AL PRIMER AÑITO DE NUESTRA PRINCESA 🎉`
          : 'TENEMOS EL HONOR DE INVITARTE AL PRIMER AÑITO DE NUESTRA PRINCESA 🎉'}
      </p>

      <div className="hija-wrapper">
        <AnimatedImage
          src={hijadisfrazada}
          alt="Cumpleañera"
          className="hija-image"
          animationProps={{ initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8 } }}
        />
        <AnimatedImage
          src={flordecoImage}
          alt="flor decorativo izquierda"
          className="flordeco-image left"
          animationProps={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
        />
        <AnimatedImage
          src={flordecoImage}
          alt="flor decorativo izquierda"
          className="flordeco-image left2"
          animationProps={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
        />
        <AnimatedImage
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right"
          animationProps={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
        />
        <AnimatedImage
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right2"
          animationProps={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
        />
        <AnimatedImage
          src={flordecoImage}
          alt="flor decorativo derecha"
          className="flordeco-image right3"
          animationProps={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
        />
      </div>

      <div className="name-date-wrapper">
        <h3 className="name">Charlotte Suarez Armijos</h3>
        <div className="decorated-date-wrapper">
          <AnimatedImage
            src={barrildecoImage}
            alt="Barril decorativa izquierda"
            className="barrildeco-image left"
            animationProps={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
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
          <AnimatedImage
            src={barrildecoImage}
            alt="Barril decorativa derecha"
            className="barrildeco-image right"
            animationProps={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } }}
          />
        </div>
      </div>

      {timeLeft && <AnimatedCountdown timeLeft={timeLeft} />}

<<<<<<< HEAD
      <LocationSection
        loading={loading}
        invitacion={invitacion}
        mensaje={mensaje}
        confirmarAsistencia={confirmarAsistencia}
      />
=======
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
              href="https://www.google.com/maps/place/2%C2%B006'41.8%22S+79%C2%B054'38.1%22W/@-2.1116078,-79.9131485,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-2.1116078!4d-79.9105736?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D">Ubicación Correcta
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
>>>>>>> fbc4f0db4ba9fedf6bf94f68003c593bb6e8c76c

      <div className="decor-bottom-wrapper">
        <AnimatedImage
          src={abajoImage}
          alt="Decoración inferior"
          className="decor-bottom-image"
          animationProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } }}
        />
      </div>
    </div>
  );
};

export default Invitation;