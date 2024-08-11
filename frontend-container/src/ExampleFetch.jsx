import React, { useEffect, useState } from 'react';
import axiosInstance from './utils/axios'; // Adjust the path as needed
import logger from './utils/logger.js';

const FetchDataComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/some-endpoint');
        setData(response.data);
      } catch (error) {
        logger.debug('ExampleFetch.jsx', 'Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FetchDataComponent;
