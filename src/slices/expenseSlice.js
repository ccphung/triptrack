import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expense: localStorage.getItem('expense')
    ? JSON.parse(localStorage.getItem('expense'))
    : [],
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
