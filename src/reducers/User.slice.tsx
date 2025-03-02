import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseData } from '../common/interfaces';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const initialState: ResponseData<User[]> = {
  data: [],
  page: 1,
  page_size: 10,
  total: 0,
  filter: '',
  search: '',
};

const UserSlice = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {
    // setData: (state, action: PayloadAction<User[]>) => {
    //   state.data = action.payload;
    // },
    // setPage: (state, action: PayloadAction<number>) => {
    //   state.page = action.payload;
    // },
    // setPageSize: (state, action: PayloadAction<number>) => {
    //   state.page_size = action.payload;
    // },
    // setTotal: (state, action: PayloadAction<number>) => {
    //   state.total = action.payload;
    // },
    // setFilter: (state, action: PayloadAction<string>) => {
    //   state.filter = action.payload;
    // },
    // setSearch: (state, action: PayloadAction<string>) => {
    //   state.search = action.payload;
    // },
    setPaginationData: (
      state,
      action: PayloadAction<{ data: User[]; total: number; page: number; page_size: number }>,
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.page_size = action.payload.page_size;
    },
  },
});

export const {
  // setData, setPage, setPageSize, setTotal, setFilter, setSearch,
  setPaginationData,
} = UserSlice.actions;
export default UserSlice.reducer;
