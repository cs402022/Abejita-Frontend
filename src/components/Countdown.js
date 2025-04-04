// src/components/Countdown.js
import { motion } from 'framer-motion';
import AnimatedImage from './AnimatedImage';
import abejitaImage from '../assets/abejita.png';

const Countdown = ({ timeLeft }) => (
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
      <AnimatedImage
        src={abejitaImage}
        alt="Abejita Chiquita"
        className="abejita-animation"
        animationProps={{
          animate: { x: [30, -30, 30], y: [-5, 5, -5], rotate: [0, 5, -5, 0] },
          transition: {
            x: { repeat: Infinity, repeatType: 'loop', duration: 3, ease: 'easeInOut' },
            y: { repeat: Infinity, repeatType: 'mirror', duration: 3, ease: 'easeInOut' },
            rotate: { repeat: Infinity, repeatType: 'loop', duration: 3, ease: 'easeInOut' },
          },
        }}
      />
    </div>
  </motion.div>
);

export default Countdown;