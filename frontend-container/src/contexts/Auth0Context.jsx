// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Authentication logic here

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node, // Define the type for children
};

export default AuthContext;
