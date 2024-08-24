import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Use named imports

// Define your custom hook
const useHelmet = () => {
  const [HelmetComponent, setHelmetComponent] = useState(() => Helmet);

  useEffect(() => {
    setHelmetComponent(() => Helmet);
  }, []);

  return HelmetComponent;
};

// Ensure useHelmet is exported as the default
export default useHelmet;

// Optionally, re-export Helmet and HelmetProvider for direct use
export { Helmet, HelmetProvider };
