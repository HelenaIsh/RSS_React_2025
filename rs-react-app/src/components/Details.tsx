import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Spinner } from './Spinner';
import { fetchSingleData } from '../services/fetchSingleData';

export const Details: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchSingleData(id);
      setData(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      return err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const closeDetails = () => {
    const queryString = searchParams.toString();
    navigate(`/?${queryString}`);
  };

  return (
    <>
      <div className="details-container">
        Details:
        <div>{data}</div>
        <button onClick={closeDetails}>Close</button>
      </div>
      {loading && <Spinner />}
    </>
  );
};
