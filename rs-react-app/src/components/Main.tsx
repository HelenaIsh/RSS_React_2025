import { FC } from 'react';
import { Results } from './Results';

interface MainProps {
  results: unknown;
  totalPages: number;
}

export const Main: FC<MainProps> = (props) => {
  return (
    <main>
      <Results {...props} />
    </main>
  );
};
