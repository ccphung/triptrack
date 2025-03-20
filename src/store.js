import { configureStore } from '@reduxjs/toolkit';

import expenseReducer from './slices/expenseSlice';
import travelReducer from './slices/travelSlice';
import { formatDate } from './utils/helpers';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    travel: travelReducer,
  },
});

export default store;

export const getExpenses = (state) => state.expense.expense;

export const getTravels = (state) => state.travel.travel;

export const getTotalExpense = (state) =>
  state.expense.expense.reduce(
    (sum, item) => Number(sum) + Number(item.price),
    0,
  );

export const getDates = (state) =>
  [...new Set(state.expense.expense.map((item) => formatDate(item.date)))].sort(
    (a, b) => new Date(b) - new Date(a),
  );
