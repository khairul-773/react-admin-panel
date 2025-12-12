import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types';

interface ProductsState {
  products: Product[];
  categories: { id: number; name: string; description: string }[];
  brands: { id: number; name: string; description: string }[];
  units: { id: number; name: string; shortName: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [
    { id: 1, name: 'Laptop', category: 'Electronics', brand: 'Dell', unit: 'pcs', barcode: '123456', price: 50000, stock: 10 },
    { id: 2, name: 'T-Shirt', category: 'Clothing', brand: 'Nike', unit: 'pcs', barcode: '789012', price: 1500, stock: 50 },
  ],
  categories: [
    { id: 1, name: 'Electronics', description: 'Electronic items and gadgets' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
  ],
  brands: [
    { id: 1, name: 'Dell', description: 'Computer and electronics manufacturer' },
    { id: 2, name: 'Nike', description: 'Sports and athletic wear' },
  ],
  units: [
    { id: 1, name: 'Pieces', shortName: 'pcs' },
    { id: 2, name: 'Kilogram', shortName: 'kg' },
    { id: 3, name: 'Liter', shortName: 'ltr' },
  ],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<{ id: number; name: string; description: string }>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    addBrand: (state, action: PayloadAction<{ id: number; name: string; description: string }>) => {
      state.brands.push(action.payload);
    },
    deleteBrand: (state, action: PayloadAction<number>) => {
      state.brands = state.brands.filter(b => b.id !== action.payload);
    },
    addUnit: (state, action: PayloadAction<{ id: number; name: string; shortName: string }>) => {
      state.units.push(action.payload);
    },
    deleteUnit: (state, action: PayloadAction<number>) => {
      state.units = state.units.filter(u => u.id !== action.payload);
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  deleteCategory,
  addBrand,
  deleteBrand,
  addUnit,
  deleteUnit,
} = productsSlice.actions;

export default productsSlice.reducer;
