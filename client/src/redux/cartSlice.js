import { createSlice } from '@reduxjs/toolkit';

const localStorageData = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        const data = serializedState ? JSON.parse(serializedState) : { items: [] };
        return data.items;
    } catch (e) {
        console.warn('Could not load state from localStorage', e);
        return [];
    }
};

const initialState = {
    items: localStorageData(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to cart
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state?.items?.find((i) => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1, flag: true });
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Remove item from cart
        removeItem: (state, action) => {
            state.items = state.items.filter((i) => i._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Update item quantity
        updateItemQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const existingItem = state.items.find((i) => i._id === _id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Increase item quantity
        increaseQuantity: (state, action) => {
            const existingItem = state.items.find((i) => i._id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Decrease item quantity
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find((i) => i._id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Clear cart
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
        // Save Cart Toggle
        moveToCart: (state, { payload }) => {
            const existingItem = state.items.find((i) => i._id === payload);
            if (existingItem) {
                existingItem.flag = !existingItem.flag;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const {
    addItem,
    removeItem,
    updateItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    moveToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
