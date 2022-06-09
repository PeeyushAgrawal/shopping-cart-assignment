import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../reducers/UserReducer';
import CartReducer from '../reducers/CartReducer';

const store = configureStore({
	reducer: {
		auth: UserReducer,
		cart: CartReducer,
	},
});

export default store;