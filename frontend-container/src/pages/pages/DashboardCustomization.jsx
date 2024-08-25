import React from 'react';
import PropTypes from 'prop-types';

const DashboardCustomization = ({ userData }) => {
  return (
    <div>
      <h2>Dashboard Customization</h2>
      <p>Personalize your dashboard view.</p>
      <div>
        <h3>Welcome, {userData.name}</h3>
        <p>Your customization settings:</p>
        <ul>
          <li>Theme: {userData.preferredTheme}</li>
          <li>Layout: {userData.layoutPreference}</li>
          {/* Other settings can be added here */}
        </ul>
      </div>
    </div>
  );
};

DashboardCustomization.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    preferredTheme: PropTypes.string,
    layoutPreference: PropTypes.string,
  }).isRequired,
};

export default DashboardCustomization;
