import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { formatDate } from '../utils/helpers';

const initialState = {
  expense: [
    {
      id: nanoid(),
      title: "McDonald's",
      date: formatDate(new Date()),
      note: 'Trop bon !!!',
      cityName: 'Paris',
      countryName: 'France',
      countryCode: 'FR',
      lat: 10,
      lng: 53,
      position: [10, 53],
      price: 23,
      category: { id: 1, name: 'Restauration', emoji: '🍕' },
    },
  ],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addItem(state, action) {
      state.expense.push(action.payload);
    },
  },
});

export const { addItem } = expenseSlice.actions;

export default expenseSlice.reducer;
