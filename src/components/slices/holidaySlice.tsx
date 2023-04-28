import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHolidayApi } from '../data/holidayApi';
import { createSlice } from '@reduxjs/toolkit';

export const fetchHolidays = createAsyncThunk(
  'holidays/fetch',
  async () => {
    const data = await fetchHolidayApi() ;
    return data;
  }
);

const initialState: any = {
  data: {},
  loading: false,
  error: null,
}

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchHolidays.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchHolidays.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchHolidays.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default holidaysSlice.reducer;
