import { FC } from 'react';
import { Results } from './Results';

interface MainProps {
  results: unknown;
}

export const Main: FC<MainProps> = ({ results }) => {
  return (
    <main>
      <Results results={results} />
    </main>
  );
};
