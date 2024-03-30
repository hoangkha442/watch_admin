import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchOrdersNYP = createAsyncThunk(
  'ordersNYP/fetchOrdersNYP',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getOrder();
      return response.data.filter(order => order.status === 'pending');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderNYSlice = createSlice({
  name: 'ordersNYP',
  initialState: {
    ordersNYP: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersNYP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersNYP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Correcting the property to match the component's useSelector
        state.ordersNYP = action.payload;
      })
      .addCase(fetchOrdersNYP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error ? action.error.message : null;
      });
  },
});

export default orderNYSlice.reducer;