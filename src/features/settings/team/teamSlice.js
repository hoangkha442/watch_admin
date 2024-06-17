import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { userService } from '../../../services/UserService';

export const fetchAdmin = createAsyncThunk(
  'admin/fetchAdmin',
  async ({ currentPage, sizeItem }, { rejectWithValue }) => {
    try {
      const response = await userService.getAdminPagination(currentPage, sizeItem);
      return {
        data: response.data,
        pageSize: sizeItem, 
        totalPage: Math.ceil(response.totalCount / sizeItem) 
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  admin: [],
  status: 'idle', 
  error: null,
  currentPage: 1,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload.data; 
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { setCurrentPage } = teamSlice.actions;
export default teamSlice.reducer;


