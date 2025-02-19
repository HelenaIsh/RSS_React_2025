import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Flayout } from './Flayout';
import { deleteChecks, fetchItemDetails } from '../../features/check';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { AppDispatch, RootState } from '../../app/store';
import '@testing-library/jest-dom';

const mockStore = configureStore<RootState, AppDispatch>([]);

vi.mock('../../features/check', () => ({
  deleteChecks: vi.fn(),
  fetchItemDetails: vi.fn(() => ({
    unwrap: vi.fn(() =>
      Promise.resolve([
        { id: 'item1', name: 'Item 1' },
        { id: 'item2', name: 'Item 2' },
      ])
    ),
  })),
  selectAllChecks: vi.fn(() => ['item1', 'item2']),
}));

describe('Flayout Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;

  beforeEach(() => {
    store = mockStore({
      checks: { selectedIds: ['item1', 'item2'], itemDetails: [] },
    } as RootState);
    store.dispatch = vi.fn((action) =>
      typeof action === 'function'
        ? action(store.dispatch, store.getState)
        : action
    );
  });

  test('renders correctly with items selected', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Flayout />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  test('calls deleteChecks when Unselect All button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Flayout />
        </ThemeContext.Provider>
      </Provider>
    );

    const button = screen.getByText('Unselect All');
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(deleteChecks());
  });

  test('calls saveFile and handles file download when Download button is clicked', async () => {
    const mockShowSaveFilePicker = vi.fn(async () => ({
      kind: 'file',
      name: 'mock-file.txt',
      createWritable: vi.fn(async () => ({
        write: vi.fn(async () => {}),
        close: vi.fn(async () => {}),
      })),
      getFile: vi.fn(async () => new File([], 'mock-file.txt')),
      isFile: true,
      isDirectory: false,
      isSameEntry: vi.fn(async () => true),
      queryPermission: vi.fn(async () => 'granted'),
      requestPermission: vi.fn(async () => 'granted'),
    }));

    Object.defineProperty(window, 'showSaveFilePicker', {
      value: mockShowSaveFilePicker,
      writable: true,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Flayout />
        </ThemeContext.Provider>
      </Provider>
    );

    const button = screen.getByText('Download');
    fireEvent.click(button);

    await vi.waitFor(() => {
      expect(fetchItemDetails).toHaveBeenCalledWith(['item1', 'item2']);
      expect(mockShowSaveFilePicker).toHaveBeenCalledWith({
        suggestedName: '2_items.csv',
        types: [
          {
            description: 'CSV File',
            accept: { 'text/csv': ['.csv'] },
          },
        ],
      });
    });
  });
});
