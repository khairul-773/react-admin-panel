import { z } from 'zod';

// Auth Schema
export const authSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AuthFormInputs = z.infer<typeof authSchema>;

// Product Schema
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').min(3, 'Product name must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  barcode: z.string().optional(),
  price: z.string().min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
  stock: z.string().min(1, 'Stock quantity is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val)), {
      message: 'Stock must be a non-negative whole number',
    }),
  description: z.string().optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;

// Post Schema
export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').min(5, 'Title must be at least 5 characters'),
  body: z.string().min(1, 'Content is required').min(10, 'Content must be at least 10 characters'),
  userId: z.number(),
});

export type PostFormInputs = z.infer<typeof postSchema>;

// Category/Brand/Unit Schema
export const nameSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
});

export const unitSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  shortName: z.string().min(1, 'Short name is required').max(10, 'Short name must be less than 10 characters'),
});

export type NameFormInputs = z.infer<typeof nameSchema>;
export type UnitFormInputs = z.infer<typeof unitSchema>;
