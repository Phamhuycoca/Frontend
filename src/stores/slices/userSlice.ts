import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ResponseList } from "../../types/response";
import type { UserRow } from "../../App";

const initialState: ResponseList<UserRow> = {
  data: [],
  page: 1,
  pageSize: 10,
  sort: "",
  search: "",
  total:0
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setDataSource: (state, action: PayloadAction<UserRow[]>) => {
      state.data = action.payload;
      state.total = action.payload.length;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setDataSource,
  setPage,
  setPageSize,
} = userSlice.actions;

export default userSlice.reducer;