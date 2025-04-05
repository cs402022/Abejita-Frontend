// src/components/AnimatedImage.js
import { motion } from 'framer-motion';

const AnimatedImage = ({ src, alt, className, animationProps = {}, customStyles = {} }) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    {...animationProps}
    style={{ ...customStyles }}
    loading="lazy"
  />
);

export default AnimatedImage;