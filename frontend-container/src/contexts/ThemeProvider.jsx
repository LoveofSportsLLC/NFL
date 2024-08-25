import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { THEME } from '../constants';
import useSettingsState from '../hooks/useSettingsState';
import ThemeContext from './ThemeContext';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useSettingsState('theme', THEME.DEFAULT);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node, // Declare the type for children
};

export default ThemeProvider;
