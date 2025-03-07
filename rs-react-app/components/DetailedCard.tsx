import { FC, useState, useEffect } from 'react';

import { Spinner } from './Spinner';
import { fetchSingleData } from '../services/fetchSingleData';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

export const DetailedCard: FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const { id } = router.query;

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchSingleData(id as string);
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
    const { query } = router;
    const restQuery = { ...query };
    delete restQuery.id;
    router.push({
      pathname: `/`,
      query: restQuery,
    });
  };

  return (
    <>
      <div
        className={
          'details-container ' +
          (theme === 'light'
            ? 'details-container--light'
            : 'details-container--dark')
        }
        data-testid="detailed-card"
      >
        Details:
        <div>{data}</div>
        <button onClick={closeDetails}>Close</button>
      </div>
      {loading && <Spinner />}
    </>
  );
};
