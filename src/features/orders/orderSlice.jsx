import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getOrder();
            return response.data.filter(order => order.status !== 'pending');
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
            });
    },
});

export default orderSlice.reducer;
