import { memo } from 'react';

export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
}

export const CountryCard = memo(
  ({
    country,
    visited,
    toggleVisited,
  }: {
    country: Country;
    visited: boolean;
    toggleVisited: (countryName: string) => void;
  }) => (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        backgroundColor: visited ? '#155724' : 'inherit',
      }}
    >
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ width: '100px' }}
      />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <label>
        <input
          type="checkbox"
          checked={visited}
          onChange={() => toggleVisited(country.name.common)}
        />{' '}
        Visited
      </label>
    </div>
  )
);

CountryCard.displayName = 'CountryCard';
