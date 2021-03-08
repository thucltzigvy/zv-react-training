import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const createTaskObj = (id, label, status) => ({
  id, label, status
})

export const taskesSlice = createSlice({
  name: 'taskes',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state[action.payload.id] = createTaskObj(action.payload.id ,action.payload.label, action.payload.status);
    },
    removeTask: (state, action) => {
      //check existing
      if(state[action.payload.id]) {
        //remove task
        delete state[action.payload.id]; 
      }
    },
    setStatus: (state, action) => {
      if(state[action.payload.id]) {
        state[action.payload.id].status = action.payload.status;
      }
    }
  },
});

export const { addTask, removeTask, setStatus } = taskesSlice.actions;

export const selectTaskes = state => Object.values(state.taskes);

export default taskesSlice.reducer;
