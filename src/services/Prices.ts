import axios from "axios";
import { useEffect, useState } from "react"
import { PaymentType } from "../interfaces";

export const GetPricesTable = () => {
  const [listPrices, setListPrices] = useState<PaymentType[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/prices`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      console.log('Niv Ingles', response.data);

      setListPrices(response.data);
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

  return { listPrices, error, loading };
};
