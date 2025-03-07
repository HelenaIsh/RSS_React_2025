'use client';

import { FC, useState } from 'react';

export const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('test error');
  }
  return (
    <footer>
      <button
        onClick={() => {
          setHasError(true);
        }}
      >
        Throw an error
      </button>
    </footer>
  );
};
