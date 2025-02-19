import checkReducer, {
  initialState,
  addCheck,
  deleteChecks,
  fetchItemDetails,
  selectAllChecks,
} from '../features/check';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { configureStore, Store } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../app/store';

describe('checkSlice', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore({ reducer: { checks: checkReducer } });
  });

  test('should return the initial state', () => {
    expect(store.getState().checks).toEqual(initialState);
  });

  test('should handle addCheck (add item)', () => {
    store.dispatch(addCheck({ id: '123', checked: true }));
    expect(store.getState().checks.selectedIds).toContain('123');
  });

  test('should handle addCheck (remove item)', () => {
    store.dispatch(addCheck({ id: '123', checked: true }));
    store.dispatch(addCheck({ id: '123', checked: false }));
    expect(store.getState().checks.selectedIds).not.toContain('123');
  });

  test('should handle deleteChecks', () => {
    store.dispatch(addCheck({ id: '123', checked: true }));
    store.dispatch(deleteChecks());
    expect(store.getState().checks.selectedIds).toEqual([]);
  });

  test('should select all checked IDs', () => {
    store.dispatch(addCheck({ id: '123', checked: true }));
    expect(selectAllChecks(store.getState())).toEqual(['123']);
  });

  test('fetchItemDetails should update state on success', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ mockData: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    const dispatch = store.dispatch as AppDispatch;

    await dispatch(fetchItemDetails(['123']));
    expect(store.getState().checks.itemDetails).toEqual([{ mockData: true }]);
  });

  test('fetchItemDetails should handle errors', async () => {
    globalThis.fetch = vi.fn(() => Promise.reject(new Error('Fetch failed')));
    const dispatch = store.dispatch as AppDispatch;

    await dispatch(fetchItemDetails(['123']));
    expect(store.getState().checks.itemDetails).toEqual([]);
  });
});
