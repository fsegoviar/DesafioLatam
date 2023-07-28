import { useEffect, useState } from 'react';
import axios from 'axios';

export const GetCurrencies = () => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/currencies`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      );
      setCurrencies(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { currencies, error, loading };
};
