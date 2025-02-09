import { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div className="spinner-overlay" data-testid={'spinner-overlay'}>
      <div className="spinner" data-testid={'spinner'}></div>
    </div>
  );
};
