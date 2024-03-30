import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchTransaction = createAsyncThunk(
    'transactions/fetchTransaction',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getPayment();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransaction.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            });
    },
});

export default transactionSlice.reducer;
