import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getOrder();
            return response.data.filter(order => order.status == 'delivered');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchOrderShipped = createAsyncThunk(
    'orders/fetchOrderShipped',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getOrder();
            return response.data.filter(order => order.status == 'shipped');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchOrderCanceled = createAsyncThunk(
    'orders/fetchOrderCanceled',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getOrder();
            return response.data.filter(order => order.status == 'Cancel');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderShipped: [],
        orderCanceled: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            })
            .addCase(fetchOrderShipped.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderShipped.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrderShipped.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            })
            .addCase(fetchOrderCanceled.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderCanceled.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrderCanceled.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            });
    },
});

export default orderSlice.reducer;
