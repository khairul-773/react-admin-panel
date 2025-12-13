import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@/types';
import { fetchData } from '@/services/api';

interface ProductsState {
  products: Product[];
  categories: { id: number; name: string; description: string }[];
  brands: { id: number; name: string; description: string }[];
  units: { id: number; name: string; shortName: string }[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch products from JSONPlaceholder
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const photos = await fetchData('photos', 500);
    
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Toys'];
    const brands = ['Samsung', 'Nike', 'Sony', 'Apple', 'Adidas', 'Dell', 'HP', 'Canon', 'LG', 'Puma'];
    
    // Transform photos data into products format
    const products: Product[] = photos.map((photo: any) => ({
      id: photo.id,
      name: photo.title.split(' ').slice(0, 3).join(' '), // First 3 words as product name
      category: categories[photo.id % categories.length],
      brand: brands[photo.id % brands.length],
      unit: 'pcs',
      barcode: `BAR${photo.id.toString().padStart(6, '0')}`,
      price: Math.floor(Math.random() * 50000) + 500,
      stock: Math.floor(Math.random() * 100) + 1,
    }));
    
    return products;
  }
);

const initialState: ProductsState = {
  products: [],
  categories: [
    { id: 1, name: 'Electronics', description: 'Electronic items and gadgets' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
  ],
  brands: [
    { id: 1, name: 'Dell', description: 'Computer and electronics manufacturer' },
    { id: 2, name: 'Nike', description: 'Sports and athletic wear' },
    { id: 3, name: 'Logitech', description: 'Computer peripherals' },
    { id: 4, name: 'Samsung', description: 'Electronics manufacturer' },
    { id: 5, name: 'Levi\'s', description: 'Denim and casual wear' },
    { id: 6, name: 'Sony', description: 'Audio and electronics' },
    { id: 7, name: 'Adidas', description: 'Sports apparel' },
    { id: 8, name: 'Apple', description: 'Premium electronics' },
    { id: 9, name: 'Puma', description: 'Athletic wear' },
    { id: 10, name: 'Generic', description: 'Various generic products' },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
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
