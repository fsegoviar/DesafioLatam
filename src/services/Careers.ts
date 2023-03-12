import axios from 'axios';
import { useEffect, useState } from 'react';
import { Career } from '../interfaces';

export const GetCareers = () => {
  const [careers, setCareers] = useState<Career[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/careers`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );

      setCareers(response.data);
    } catch (error) {
      console.log('Error =>', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { careers, error, loading };
};
