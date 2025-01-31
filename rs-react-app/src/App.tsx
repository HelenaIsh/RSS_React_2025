import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorButton } from './components/ErrorButton';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  return (
    <div className="app">
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <Header />
        <Main />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
