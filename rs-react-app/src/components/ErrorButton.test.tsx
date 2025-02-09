import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import { expect, test, describe } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import '@testing-library/jest-dom';

describe('ErrorButton Component', () => {
  test('renders the button', () => {
    render(<ErrorButton />);

    expect(screen.getByText('Throw an error')).toBeInTheDocument();
  });

  test('throws an error when the button is clicked', () => {
    render(
      <ErrorBoundary fallback={'Something went wrong.'}>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw an error'));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
