import React, { useState, useEffect } from 'react';

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

export default SSRFriendlyWrapper;
