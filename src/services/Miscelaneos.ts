import { useEffect, useState } from 'react';
import {
  IdentitUserType,
  LaborSituationUser,
  LevelEducationUser,
  LevelEnglishUser
} from '../interfaces';
import axios from 'axios';

export const GetIdentityTypes = () => {
  const [indentityTypes, setIndentityTypes] = useState<IdentitUserType[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/identity_types`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      );

      setIndentityTypes(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { indentityTypes, error, loading };
};

export const GetEnglishLevel = () => {
  const [englishLevel, setEnglishLevel] = useState<LevelEnglishUser[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/english_levels`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      );
      console.log('Niv Ingles', response);

      setEnglishLevel(response.data);
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

  return { englishLevel, error, loading };
};

export const GetEducationLevel = () => {
  const [educationLevel, setEducationLevel] = useState<LevelEducationUser[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/educational_levels`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      );

      setEducationLevel(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { educationLevel, error, loading };
};

export const GetWorkSituations = () => {
  const [workSituations, setWorkSituations] = useState<LaborSituationUser[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/work_situations`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      );

      setWorkSituations(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { workSituations, error, loading };
};
