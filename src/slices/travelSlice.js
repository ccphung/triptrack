import { createSlice } from '@reduxjs/toolkit';

const defaultTravels = [
  {
    id: 1,
    title: 'Voyage à Tokyo',
    date: '2025-06-15',
    color: 'violet-500',
    travelers: ['Cédric', 'Alice', 'Tom'],
    createdAt: new Date('2025-04-01').toISOString(),
  },
  {
    id: 2,
    title: 'Séjour à Rome',
    date: '2025-07-22',
    color: 'green-500',
    travelers: ['Marie', 'Luc'],
    createdAt: new Date('2025-04-10').toISOString(),
  },
  {
    id: 3,
    title: 'Road Trip USA',
    date: '2025-08-05',
    color: 'orange-500',
    travelers: ['Cédric', 'Sophie', 'Marc', 'Emma'],
    createdAt: new Date('2025-04-15').toISOString(),
  },
];

const initialState = {
  travel: localStorage.getItem('travel')
    ? [...JSON.parse(localStorage.getItem('travel')), ...defaultTravels]
    : defaultTravels,
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    createTravel(state, action) {
      state.travel.push(action.payload);

      const currentTravels = [...defaultTravels, ...state.travel];
      localStorage.setItem('travel', JSON.stringify(currentTravels));
    },

    deleteTravel(state, action) {
      state.travel = state.travel.filter(
        (travel) => travel.id !== action.payload,
      );

      const currentTravels = [...defaultTravels, ...state.travel];
      localStorage.setItem('travel', JSON.stringify(currentTravels));
    },
  },
});

export const { createTravel, deleteTravel } = travelSlice.actions;

export default travelSlice.reducer;
