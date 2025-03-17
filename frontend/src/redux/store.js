import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import authApi from './features/auth/authApi'
import authReducer from "./features/auth/authSlice"
import sellerauthReducer from "./features/sellerauth/sellerauthSlice"
import productsApi from './features/products/productsApi';
import reviewsApi from './features/reviews/reviewsApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/orderApi';
import sellerauthApi from './features/sellerauth/sellerauthApi';

export const store = configureStore({
  reducer: {
   cart: cartReducer,
   [authApi.reducerPath] : authApi.reducer,
   auth:authReducer,
   [sellerauthApi.reducerPath] : sellerauthApi.reducer,
   sellerauth:sellerauthReducer,
   [productsApi.reducerPath]:productsApi.reducer,
   [reviewsApi.reducerPath]:reviewsApi.reducer,
   [statsApi.reducerPath]:statsApi.reducer,
   [orderApi.reducerPath]:orderApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,reviewsApi.middleware,statsApi.middleware,orderApi.middleware,sellerauthApi.middleware),
  
});