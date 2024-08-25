import React from 'react';
import PropTypes from 'prop-types';

const LeaguePreferences = ({ userData }) => {
  return (
    <div>
      <h2>League Preferences</h2>
      <p>Configure your league preferences here.</p>
      {userData && (
        <div>
          <p>
            <strong>Favorite League:</strong> {userData.favoriteLeague}
          </p>
          <p>
            <strong>Preferred Positions:</strong>{' '}
            {userData.preferredPositions.join(', ')}
          </p>
          {/* More use-cases of userData can go here */}
        </div>
      )}
    </div>
  );
};

LeaguePreferences.propTypes = {
  userData: PropTypes.shape({
    favoriteLeague: PropTypes.string.isRequired,
    preferredPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default LeaguePreferences;
