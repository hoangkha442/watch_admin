import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import productReducer from '../features/products/productSlice';
import supplierReducer from '../features/supplier/supplierSlice';
import categoryReducer from '../features/productCategories/categorySlice';
import userReducer from '../features/users/userSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import orderReducer from '../features/orders/orderSlice';
import orderNYPReducer from '../features/ordersNotYetProcessed/orderNYSlice';
import teamReducer from '../features/settings/team/teamSlice';
const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  products: productReducer,
  suppliers: supplierReducer,
  categories: categoryReducer,
  users: userReducer,
  transactions: transactionReducer,
  orders: orderReducer,
  orderNYP: orderNYPReducer,
  teams: teamReducer
}

export default configureStore({
    reducer: combinedReducer
})