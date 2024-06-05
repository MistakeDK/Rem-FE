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

enum PromotionType {
    PERCENT = "PERCENT",
    DIRECT = "DIRECT"
}

interface CartState {
    items: CartItem[];
    promotionCode: string | null
    promotionType: PromotionType;
    promotionValue: number;
}

const initialState: CartState = {
    items: [],
    promotionCode: null,
    promotionType: PromotionType.DIRECT,
    promotionValue: 0
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
            }
            state.promotionCode = null
            state.promotionType = PromotionType.DIRECT
            state.promotionValue = 0
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            state.promotionCode = null
            state.promotionType = PromotionType.DIRECT
            state.promotionValue = 0
        },
        setItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        setPromotion: (state, action: PayloadAction<{ promotionCode: string, promotionType: PromotionType, promotionValue: number }>) => {
            state.promotionType = action.payload.promotionType;
            state.promotionValue = action.payload.promotionValue;
            state.promotionCode = action.payload.promotionCode;
        },
        removePromotion: (state) => {
            state.promotionCode = null
            state.promotionType = PromotionType.DIRECT
            state.promotionValue = 0
        }
    },
});

export const { updateQuantity, removeItem, setItems, setPromotion, removePromotion } = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotal = (state: RootState, isUseForPreTotal: boolean = false) => {
    const total = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (!isUseForPreTotal) {
        if (state.cart.promotionType === PromotionType.PERCENT) {
            return total * (1 - state.cart.promotionValue / 100);
        } else if (state.cart.promotionType === PromotionType.DIRECT) {
            return total - state.cart.promotionValue;
        }
    }
    return total
};
