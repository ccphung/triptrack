import { createSlice } from '@reduxjs/toolkit';

const initialExpenses = [
  // Voyage à Tokyo
  {
    id: 'exp1',
    travelId: '1',
    title: 'Sushi Dinner',
    note: 'Dîner à Shibuya',
    country: 'Japan',
    cityName: 'Tokyo',
    countryCode: 'JP',
    date: '2025-06-16',
    price: 75,
    category: 'Restauration',
    lat: '35.6586',
    lng: '139.7454',
    position: [35.6586, 139.7454],
    selectedCurrency: 'EUR',
    exchangeRate: 1,
    createdAt: new Date('2025-06-16').toISOString(),
    currency: 'JPY',
    payer: 'Cédric',
  },
  {
    id: 'exp2',
    travelId: '1',
    title: 'Transport métro',
    note: 'Carte Suica',
    country: 'Japan',
    cityName: 'Tokyo',
    countryCode: 'JP',
    date: '2025-06-17',
    price: 25,
    category: 'Transport',
    lat: '35.6812',
    lng: '139.7671',
    position: [35.6812, 139.7671],
    selectedCurrency: 'EUR',
    exchangeRate: 1,
    createdAt: new Date('2025-06-17').toISOString(),
    currency: 'JPY',
    payer: 'Alice',
  },

  // Séjour à Rome
  {
    id: 'exp3',
    travelId: '2',
    title: 'Pizza Trastevere',
    note: 'Déjeuner à Rome',
    country: 'Italy',
    cityName: 'Rome',
    countryCode: 'IT',
    date: '2025-07-23',
    price: 40,
    category: 'Restauration',
    lat: '41.8931',
    lng: '12.4663',
    position: [41.8931, 12.4663],
    selectedCurrency: 'EUR',
    exchangeRate: 1,
    createdAt: new Date('2025-07-23').toISOString(),
    currency: 'EUR',
    payer: 'Luc',
  },
  {
    id: 'exp4',
    travelId: '2',
    title: 'Colisée',
    note: 'Visite du Colisée',
    country: 'Italy',
    cityName: 'Rome',
    countryCode: 'IT',
    date: '2025-07-24',
    price: 30,
    category: 'Activité',
    lat: '41.8902',
    lng: '12.4922',
    position: [41.8902, 12.4922],
    selectedCurrency: 'EUR',
    exchangeRate: 1,
    createdAt: new Date('2025-07-24').toISOString(),
    currency: 'EUR',
    payer: 'Marie',
  },

  // Road Trip USA
  {
    id: 'exp5',
    travelId: '3',
    title: 'Essence',
    note: 'Los Angeles',
    country: 'USA',
    cityName: 'Los Angeles',
    countryCode: 'US',
    date: '2025-08-06',
    price: 60,
    category: 'Transport',
    lat: '34.0522',
    lng: '-118.2437',
    position: [34.0522, -118.2437],
    selectedCurrency: 'EUR',
    exchangeRate: 1.1,
    createdAt: new Date('2025-08-06').toISOString(),
    currency: 'USD',
    payer: 'Marc',
  },
  {
    id: 'exp6',
    travelId: '3',
    title: 'Parc Yosemite',
    note: 'Entrée au parc',
    country: 'USA',
    cityName: 'Yosemite',
    countryCode: 'US',
    date: '2025-08-08',
    price: 50,
    category: 'Activité',
    lat: '37.8651',
    lng: '-119.5383',
    position: [37.8651, -119.5383],
    selectedCurrency: 'EUR',
    exchangeRate: 1.1,
    createdAt: new Date('2025-08-08').toISOString(),
    currency: 'USD',
    payer: 'Sophie',
  },
];

const initialState = {
  expense: localStorage.getItem('expense')
    ? [...JSON.parse(localStorage.getItem('expense')), ...initialExpenses]
    : initialExpenses,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    createExpense(state, action) {
      state.expense.push(action.payload);
      const currentExpenses = JSON.parse(localStorage.getItem('expense')) || [];
      currentExpenses.push(action.payload);
      localStorage.setItem('expense', JSON.stringify(currentExpenses));
    },

    deleteExpense(state, action) {
      state.expense = state.expense.filter(
        (expense) => expense.id !== action.payload,
      );
      let currentExpenses = JSON.parse(localStorage.getItem('expense')) || [];
      currentExpenses = currentExpenses.filter(
        (expense) => expense.id !== action.payload,
      );
      localStorage.setItem('expense', JSON.stringify(currentExpenses));
    },

    deleteExpensesByTravelId(state, action) {
      state.expense = state.expense.filter(
        (expense) => expense.travelId !== action.payload,
      );
      let currentExpenses = JSON.parse(localStorage.getItem('expense')) || [];
      currentExpenses = currentExpenses.filter(
        (expense) => expense.travelId !== action.payload,
      );
      localStorage.setItem('expense', JSON.stringify(currentExpenses));
    },
  },
});

export const { createExpense, deleteExpense, deleteExpensesByTravelId } =
  expenseSlice.actions;

export default expenseSlice.reducer;
