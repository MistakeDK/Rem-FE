import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';

interface CartItem {
    id: string;
    name: string;
    price: number;
    img: string;
    quantity: number;
    active: boolean;
}

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
                state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        setItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    },
});

export const { updateQuantity, removeItem, setItems } = cartSlice.actions;

export default cartSlice.reducer;
