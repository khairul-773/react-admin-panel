export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface CRUDData {
  id?: number;
  title: string;
  body: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  unit: string;
  barcode: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
}

export interface Unit {
  id: number;
  name: string;
  shortName: string;
}

export interface BarcodeItem {
  id: number;
  productName: string;
  barcode: string;
  generatedDate: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}