import React from 'react';
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

      <LocationSection
        loading={loading}
        invitacion={invitacion}
        mensaje={mensaje}
        confirmarAsistencia={confirmarAsistencia}
      />

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