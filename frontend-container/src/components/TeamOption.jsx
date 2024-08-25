import React from 'react';

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

export default TeamOption;
