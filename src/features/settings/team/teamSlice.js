import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../../services/UserService';

// Create an async thunk to fetch admin users
export const fetchAdmin = createAsyncThunk(
  'admin/fetchAdmin',
  async ({ currentPage, sizeItem }, { rejectWithValue }) => {
    try {
      const response = await userService.getAdminPagination(currentPage, sizeItem);
      return {
        data: response.data,
        pageSize: sizeItem,
        totalPage: Math.ceil(response.totalCount / sizeItem),
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || 'An error occurred while fetching admin users.'
      );
    }
  }
);

// Initialize the state
const initialState = {
  admin: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1,
  pageSize: 5,
  totalPage: 0,
};

// Create the slice
const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // Action to set the current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Action to set the page size
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
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
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setCurrentPage, setPageSize } = teamSlice.actions;
export default teamSlice.reducer;
