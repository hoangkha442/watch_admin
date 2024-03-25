import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/ProductService';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ currentPage, sizeItem }, thunkAPI) => {
    try {
      const response = await productService.getProductPagination(currentPage, sizeItem);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

