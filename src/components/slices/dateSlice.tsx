import { createSlice } from '@reduxjs/toolkit';
import { dateString, day, month, year } from '../../lib/date';

const initialState = {
  dateString,
  day: Number(day),
  month: Number(month),
  year: Number(year)
}
const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    clear: () => initialState,
    setDate: (state, action) => {
      const {dateString, month, day, year} = action.payload;
      state.dateString = dateString;
      state.month = month;
      state.day = day;
      state.year = year;
    },
  },
});

export const { setDate, clear } = dateSlice.actions;
export default dateSlice.reducer;
