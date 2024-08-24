import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Use named imports

// Define your custom hook
const useHelmet = () => {
  const [HelmetComponent, setHelmetComponent] = useState(() => Helmet);

  useEffect(() => {
    setHelmetComponent(() => Helmet);
  }, []);

  return HelmetComponent || Helmet; // Ensure Helmet is always returned
};

export default useHelmet;
export { Helmet, HelmetProvider };
