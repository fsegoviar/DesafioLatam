import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetRegisters = () => {
  const [registers, setRegisters] = useState<any[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/registers`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      setRegisters(response.data);
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

  return { registers, error, loading };
};
