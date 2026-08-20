// authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from '../../utils/helpers/jwt';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.userId = decodeToken(action.payload)?.userId ?? null;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
