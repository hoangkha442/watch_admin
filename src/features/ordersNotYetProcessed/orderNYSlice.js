// // fetchOrdersNYP.js

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { productService } from '../../services/ProductService';

// export const fetchOrdersNYP = createAsyncThunk(
//   'ordersNYP/fetchOrdersNYP',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await productService.getOrder();
//       return response.data.filter(order => order.status === 'pending');
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // New action for updating a single order's status
// export const updateOrderStatus = createAsyncThunk(
//   'ordersNYP/updateOrderStatus',
//   async ({ orderId, status }, { dispatch, rejectWithValue }) => {
//     try {
//       await productService.putStatusOrder(orderId, { status });
//       dispatch(fetchOrdersNYP()); // Optionally refetch orders here or just update the status
//       return { orderId, status };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const fetchOrdersNYP = createSlice({
//   name: 'ordersNYP',
//   initialState: {
//     ordersNYP: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle the fetchOrdersNYP async actions
//       .addCase(fetchOrdersNYP.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOrdersNYP.fulfilled, (state, action) => {
//         state.ordersNYP = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchOrdersNYP.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Optionally handle the updateOrderStatus async action
//       // This is where you would update a single order's status in the state
//       // if you chose to do so instead of refetching all orders
//       ;
//   },
// });

// export default fetchOrdersNYP.reducer;
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
      await productService.putStatusOrder(orderId, { status: newStatus });
      // You can choose to refetch all orders
      // dispatch(fetchOrdersNYP());
      // Or update the specific order status in state to avoid refetching
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
