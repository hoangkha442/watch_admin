import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchSuppliers = createAsyncThunk(
    'suppliers/fetchSuppliers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getSupplier();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const supplierSlice = createSlice({
    name: 'suppliers',
    initialState: {
        suppliers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suppliers = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : null;
            });
    },
});

export default supplierSlice.reducer;
