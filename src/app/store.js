import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import productReducer from '../features/products/productSlice';
import supplierReducer from '../features/supplier/supplierSlice';
import categoryReducer from '../features/productCategories/categorySlice';
const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  products: productReducer,
  suppliers: supplierReducer,
  categories: categoryReducer,
}

export default configureStore({
    reducer: combinedReducer
})