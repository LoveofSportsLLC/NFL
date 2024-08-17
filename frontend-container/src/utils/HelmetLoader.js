import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const useHelmet = () => {
  const [HelmetComponent, setHelmetComponent] = useState(null);

  useEffect(() => {
    setHelmetComponent(() => Helmet);
  }, []);

  return HelmetComponent;
};

export default useHelmet;
