import { useEffect, useState } from 'react';
import helmetPkg from 'react-helmet-async';
const { Helmet, HelmetProvider } = helmetPkg;

// Define your custom hook
const useHelmet = () => {
  const [HelmetComponent, setHelmetComponent] = useState(null);

  useEffect(() => {
    setHelmetComponent(() => Helmet);
  }, []);

  return HelmetComponent;
};

// Ensure useHelmet is exported as the default
export default useHelmet;

// Optionally, re-export Helmet and HelmetProvider for direct use
export { Helmet, HelmetProvider };
