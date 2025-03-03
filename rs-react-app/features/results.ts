import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchResults } from '../services/fetchApi';

interface ResultsState {
  results: unknown;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ResultsState = {
  results: undefined,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  'results/fetchData',
  async (
    { name, page }: { name: string; page: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchResults(name, page);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }
);

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload['animals'] || [];
        state.totalPages = +action.payload.page.totalPages;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resultsSlice.reducer;
