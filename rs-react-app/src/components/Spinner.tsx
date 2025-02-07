import { FC } from 'react';

export const Spinner: FC = () => {
  return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
}
