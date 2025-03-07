import { CardList } from './CardList';
import { Pagination } from './Pagination';
import { DetailedCardWrapper, FlayoutWrapper } from './DetailedCardWrapper';
import { fetchResults } from '../services/fetchApi';

interface PageProps {
  name?: string;
  page?: string;
}

export const Main = async ({ name = 'a', page = '0' }: PageProps) => {
  const results = await fetchResults(name, page);

  return (
    <main>
      <div className="main-container">
        <CardList results={results.animals} />
        <DetailedCardWrapper />
      </div>
      <Pagination />
      <footer />
      <FlayoutWrapper />
    </main>
  );
};
