import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  [key: string]: any;
  salary?: [number, number];
}

const initialState: FilterState = {};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<{ [key: string]: any }>) => {
      // This allows updating multiple filter keys at once
      const payload = action.payload;
      Object.keys(payload).forEach(key => {
        const value = payload[key];
        // Remove filter if value is empty array or null/undefined
        if (Array.isArray(value) && value.length === 0) {
          delete state[key];
        } else if (value === null || value === undefined) {
          delete state[key];
        } else {
          state[key] = value;
        }
      });
    },
    updateSalaryFilter: (state, action: PayloadAction<[number, number]>) => {
      state.salary = action.payload;
    },
    resetFilter: () => initialState,
    clearAllFilters: () => initialState,
  },
});

export const { updateFilter, updateSalaryFilter, resetFilter, clearAllFilters } = filterSlice.actions;
export default filterSlice.reducer;