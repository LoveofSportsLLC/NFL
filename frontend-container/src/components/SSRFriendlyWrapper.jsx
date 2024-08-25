import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const SSRFriendlyWrapper = ({ children, onClientLoad }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      if (onClientLoad) {
        onClientLoad();
      }

      // Example module check using dynamic import
      //   import('some-module')
      //     .then((someModule) => {
      //       console.log('Module loaded:', someModule);
      //     })
      //     .catch((error) => {
      //       console.error('Module not found:', error);
      //     });
    }
  }, [onClientLoad]);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

SSRFriendlyWrapper.propTypes = {
  children: PropTypes.node, // Define the type for children
  onClientLoad: PropTypes.func, // Define the type for onClientLoad
};

export default SSRFriendlyWrapper;
