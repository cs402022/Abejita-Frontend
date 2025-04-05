import { motion } from 'framer-motion';
import AnimatedImage from './AnimatedImage';
import abejitaImage2 from '../assets/abejita2.png'; // Importa la imagen
import locationIcon from '../assets/location.png';
import usuario from '../assets/usuario.png';
import abejitaImage from '../assets/abejita.png'; // Si también usas esta imagen para el loading

const LocationSection = ({ loading, invitacion, mensaje, confirmarAsistencia }) => (
  <div className="location-container">
    <div className="abejita-wrapper2">
      <AnimatedImage
        src={abejitaImage2}
        alt="Abejita Chiquita2"
        className="abejita-animation2"
        animationProps={{
          animate: { x: [15, -15, 15], y: [-3, 3, -3] }, // Reducimos el movimiento
          transition: {
            x: { repeat: Infinity, repeatType: 'loop', duration: 2.5, ease: 'easeInOut' },
            y: { repeat: Infinity, repeatType: 'mirror', duration: 3, ease: 'easeInOut' },
            rotate: { repeat: Infinity, repeatType: 'loop', duration: 3, ease: 'easeInOut' },
          },
        }}
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
          <motion.div className="loading-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Cargando tu invitación...</p>
            <AnimatedImage
              src={abejitaImage}
              alt="Abejita cargando"
              className="abejita-loading"
              animationProps={{ animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity } }}
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
);

export default LocationSection;