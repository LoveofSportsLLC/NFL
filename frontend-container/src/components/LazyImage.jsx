import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const LazyImage = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} loading="lazy" {...props} />;
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired, // Ensure `src` is a string and required
  alt: PropTypes.string.isRequired, // Ensure `alt` is a string and required
};

export default LazyImage;
