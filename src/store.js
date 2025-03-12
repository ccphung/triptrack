import { configureStore } from '@reduxjs/toolkit';

import expenseReducer from './slices/expenseSlice';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },
});

export default store;

export const getExpenses =  (state) => state.expense.expense;

export const getTotalExpense = (state) =>
  state.expense.expense.reduce(
    (sum, item) => Number(sum) + Number(item.price),
    0,
  );
