import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface DetailsProps {
  details: string;
}

export const Details: FC<DetailsProps> = ({ details }) => {
  const navigate = useNavigate();

  const closeDetails = () => {
    navigate(`/`);
  };

  return (
    <div>
      <button onClick={closeDetails}>Close</button>
      <div>
        <p>{details}</p>
      </div>
    </div>
  );
};
