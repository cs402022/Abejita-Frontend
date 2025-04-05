// src/components/WelcomeOverlay.js
import { motion } from 'framer-motion';

const WelcomeOverlay = ({ showOverlay, onStart }) => (
  showOverlay && (
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
          onClick={onStart}
          onTouchStart={onStart}
          className="start-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Comenzar
        </motion.button>
      </div>
    </motion.div>
  )
);

export default WelcomeOverlay;