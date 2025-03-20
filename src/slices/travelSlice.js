import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  travel: localStorage.getItem('travel')
    ? JSON.parse(localStorage.getItem('travel'))
    : [],
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    createTravel(state, action) {
      state.travel.push(action.payload);
      const currentTravels = JSON.parse(localStorage.getItem('travel')) || [];
      currentTravels.push(action.payload);
      localStorage.setItem('travel', JSON.stringify(currentTravels));
    },

    deleteTravel(state, action) {
      state.travel = state.travel.filter(
        (travel) => travel.id !== action.payload,
      );
      let currentTravels = JSON.parse(localStorage.getItem('travel')) || [];
      currentTravels = currentTravels.filter(
        (travel) => travel.id !== action.payload,
      );
      localStorage.setItem('travel', JSON.stringify(currentTravels));
    },
  },
});

export const { createTravel, deleteTravel, addExpense } = travelSlice.actions;

export default travelSlice.reducer;
