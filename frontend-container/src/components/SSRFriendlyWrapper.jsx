import React, { useState, useEffect } from 'react';

const SSRFriendlyWrapper = ({ children, onClientLoad }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      if (onClientLoad) {
        onClientLoad();
      }
    }
  }, [onClientLoad]);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default SSRFriendlyWrapper;
