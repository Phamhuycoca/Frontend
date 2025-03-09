import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseData } from '../common/interfaces';
import { ICategory } from '../modules/Categories/CategoryService';

const initialState: ResponseData<ICategory[]> = {
  data: [],
  page: 1,
  page_size: 10,
  total: 0,
  filter: '',
  search: '',
};
const CategorySlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setPaginationData: (
      state,
      action: PayloadAction<{ data: ICategory[]; total: number; page: number; page_size: number }>,
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.page_size = action.payload.page_size;
    },
  },
});

export const { setPaginationData } = CategorySlice.actions;
export default CategorySlice.reducer;
