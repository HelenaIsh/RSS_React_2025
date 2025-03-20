import { memo } from 'react';

export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
}

export const CountryCard = memo(({ country }: { country: Country }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
    <img
      src={country.flags.png}
      alt={country.name.common}
      style={{ width: '100px' }}
    />
    <h3>{country.name.common}</h3>
    <p>Population: {country.population}</p>
    <p>Region: {country.region}</p>
  </div>
));

CountryCard.displayName = 'CountryCard';
