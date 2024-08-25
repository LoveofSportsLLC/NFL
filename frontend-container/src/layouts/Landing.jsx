import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Outlet } from 'react-router-dom';
import Main from '../components/Main';

const Landing = ({ children }) => {
  return (
    <Main>
      {children}
      <Outlet />
    </Main>
  );
};

Landing.propTypes = {
  children: PropTypes.node, // Define the expected type for children
};

export default Landing;
