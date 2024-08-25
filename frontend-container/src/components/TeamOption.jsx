import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const TeamOption = ({ teamName, onSelect, logoPath }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect();
    }
  };

  return (
    <div
      onClick={onSelect}
      className="team-option"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <img src={logoPath} alt={teamName} />
      <span>{teamName}</span>
    </div>
  );
};

TeamOption.propTypes = {
  teamName: PropTypes.string.isRequired, // Ensure teamName is a string
  onSelect: PropTypes.func.isRequired, // Ensure onSelect is a function
  logoPath: PropTypes.string.isRequired, // Ensure logoPath is a string (for the image source)
};

export default TeamOption;
