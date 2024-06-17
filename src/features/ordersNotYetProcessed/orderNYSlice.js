
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchOrdersNYP = createAsyncThunk(
    'ordersNYP/fetchOrdersNYP',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getOrder()
            return response.data.filter(order => order.status === 'pending');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateOrderStatus = createAsyncThunk(
  'ordersNYP/updateOrderStatus',
  async ({ orderId, newStatus }, { dispatch, getState, rejectWithValue }) => {
    try {
      await productService.putStatusOrder(orderId, { status: newStatus })
      return { orderId, status: newStatus };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Slice
const OrdersNYPSlice = createSlice({
    name: 'ordersNYP',
    initialState: {
      ordersNYP: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersNYP.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrdersNYP.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ordersNYP = action.payload;
            })
            .addCase(fetchOrdersNYP.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
              const { orderId, status } = action.payload;
              const orderIndex = state.ordersNYP.findIndex(order => order.order_id === orderId);
              if (orderIndex !== -1) {
                state.ordersNYP[orderIndex].status = status;
              }
            })
    },
});

export default OrdersNYPSlice.reducer;
