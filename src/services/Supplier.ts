import axios from 'axios';
import { useEffect, useState } from 'react';
import { SupplierType } from '../interfaces';

export const GetFormsPayments = () => {
  const [paymentForms, setPaymentForms] = useState<SupplierType[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/suppliers`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      setPaymentForms(response.data);
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

  return { paymentForms, error, loading };
};
