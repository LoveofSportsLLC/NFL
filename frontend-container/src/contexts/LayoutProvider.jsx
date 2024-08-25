// src/contexts/LayoutProvider.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { LAYOUT } from '../constants';
import useSettingsState from '../hooks/useSettingsState';
import LayoutContext from './LayoutContext'; // Import the context

function LayoutProvider({ children }) {
  const [layout, setLayout] = useSettingsState('layout', LAYOUT.FLUID);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

LayoutProvider.propTypes = {
  children: PropTypes.node, // Declare the type for children
};

export default LayoutProvider;
