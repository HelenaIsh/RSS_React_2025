import { useState, useEffect } from 'react';
import './App.css';
import { Country, CountryCard } from './components/Country';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [sortKey, setSortKey] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) => (region === 'all' ? true : country.region === region))
    .sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc'
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else {
        return sortOrder === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
    });

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Search countries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="all">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as 'name' | 'population')}
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
      </select>
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
};

export default App;
