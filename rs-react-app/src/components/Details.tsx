import { FC } from 'react';

interface DetailsProps {
  details: string;
  setItemId: (id: string | undefined) => void;
}

export const Details: FC<DetailsProps> = ({ details, setItemId }) => {
  const closeDetails = () => {
    setItemId(undefined);
  };

  return (
    <div className="details-container">
      Details:
      <div>
        <p>id: {details}</p>
      </div>
      <button onClick={closeDetails}>Close</button>
    </div>
  );
};
