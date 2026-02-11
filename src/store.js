import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configuring the Redux Store
const store = configureStore({
    // The reducer key defines how different pieces of state are managed
    reducer: {
        // Assigning cartReducer to manage the 'cart' slice of the state
        cart: cartReducer,
    },
});

export default store;