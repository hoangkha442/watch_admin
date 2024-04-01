import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/UserService';
import { createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ currentPage, sizeItem }, thunkAPI) => {
    try {
      const response = await userService.getUserPagination(currentPage, sizeItem);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (_, { rejectWithValue }) => {
      try {
          const response = await userService.getUserToken();
          return response;
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);



const initialState = {
  users: [],
  user: [],
  status: 'idle', 
  error: null,
  currentPage: 1,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;


