import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckPayload {
  id: string;
  checked: boolean;
}

const initialState: { selectedIds: string[]; itemDetails: unknown[] } = {
  selectedIds: [],
  itemDetails: [],
};

export const fetchItemDetails = createAsyncThunk(
  'checks/fetchItemDetails',
  async (ids: string[], { rejectWithValue }) => {
    try {
      const fetchRequests = ids.map((id) =>
        fetch(`https://stapi.co/api/v1/rest/animal?uid=${id}`).then((res) =>
          res.json()
        )
      );
      const responses = await Promise.all(fetchRequests);
      return responses;
    } catch {
      return rejectWithValue('Failed to fetch item details.');
    }
  }
);

const checkSlice = createSlice({
  name: 'checks',
  initialState,
  reducers: {
    addCheck: (state, action: PayloadAction<CheckPayload>) => {
      const { id, checked } = action.payload;
      if (checked) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds = state.selectedIds.filter((check) => check !== id);
      }
    },
    deleteChecks: (state) => {
      state.selectedIds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemDetails.fulfilled, (state, action) => {
      state.itemDetails = action.payload;
    });
  },
});

export const selectAllChecks = (state: { checks: { selectedIds: string[] } }) =>
  state.checks.selectedIds;

export const { addCheck, deleteChecks } = checkSlice.actions;

export default checkSlice.reducer;
