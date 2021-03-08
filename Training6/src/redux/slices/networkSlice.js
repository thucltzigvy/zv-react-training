import { createSlice } from '@reduxjs/toolkit';
import networkConst from '../../constances/network';

const initialState = {
  status: networkConst.DISCONNECTED,
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.status = action.payload.status;
    }
  },
});

export const { setNetworkStatus } = networkSlice.actions;

export const selectNetworkStatus = state => state.network.status;

export default networkSlice.reducer;
