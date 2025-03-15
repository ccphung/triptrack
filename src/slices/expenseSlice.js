import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { formatDate } from '../utils/helpers';

const initialState = {
  expense: [
    {
      id: nanoid(),
      title: "McDonald's",
      date: formatDate('11-12-2024'),
      note: 'Trop bon !!!',
      cityName: 'Rome',
      countryName: 'Italy',
      countryCode: 'IT',
      lat: 10,
      lng: 53,
      selectedCurrency: 'EUR',
      position: [10, 53],
      price: 23,
      category: { id: 1, name: 'Restauration', emoji: '🍕' },
      createdAt: new Date('11-12-2024'),
    },
    {
      id: nanoid(),
      title: 'KFC',
      date: formatDate('03-14-2025'),
      note: 'Trop bon !!!',
      cityName: 'Paris',
      countryName: 'France',
      countryCode: 'FR',
      lat: 10,
      lng: 53,
      selectedCurrency: 'EUR',
      position: [10, 53],
      price: 114,
      category: { id: 1, name: 'Restauration', emoji: '🍕' },
      createdAt: new Date('11-12-2024'),
    },
    {
      id: nanoid(),
      title: 'Essence',
      date: formatDate('03-14-2025'),
      note: 'Trop bon !!!',
      cityName: 'Paris',
      countryName: 'France',
      countryCode: 'FR',
      lat: 10,
      lng: 53,
      selectedCurrency: 'EUR',
      position: [10, 53],
      price: 3,
      category: { id: 1, name: 'Restauration', emoji: '🍕' },
      createdAt: new Date('11-12-2024'),
    },
    {
      id: nanoid(),
      title: 'Souvenirs',
      date: formatDate('08-02-2022'),
      note: 'Pas cher',
      cityName: 'Paris',
      countryName: 'France',
      countryCode: 'FR',
      lat: 10,
      lng: 53,
      selectedCurrency: 'EUR',
      position: [10, 53],
      price: 93,
      category: { id: 2, name: 'Shop', emoji: '🛍️' },
      createdAt: new Date('11-12-2024'),
    },
    {
      id: nanoid(),
      title: 'Restau',
      date: formatDate('05-02-2022'),
      note: 'Trop bon !!!',
      cityName: 'Paris',
      countryName: 'France',
      countryCode: 'FR',
      lat: 10,
      lng: 53,
      selectedCurrency: 'EUR',
      position: [10, 53],
      price: 93,
      category: { id: 1, name: 'Restauration', emoji: '🍕' },
      createdAt: new Date('11-12-2024'),
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
