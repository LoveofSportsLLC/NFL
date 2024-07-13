import { useEffect, useState } from 'react';

const useHelmet = () => {
  const [Helmet, setHelmet] = useState(null);

  useEffect(() => {
    import('react-helmet-async').then((module) => {
      setHelmet(() => module.Helmet);
    });
  }, []);

  return Helmet;
};

export default useHelmet;
