import { z } from 'zod';
import { VALIDATION, ERROR_MESSAGES } from '@/constants';

// Auth Schema
export const authSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .email(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL),
  password: z
    .string()
    .min(
      VALIDATION.MIN_PASSWORD_LENGTH,
      `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`
    ),
});

export type AuthFormInputs = z.infer<typeof authSchema>;

// Product Schema
export const productSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .min(
      VALIDATION.MIN_PRODUCT_NAME_LENGTH,
      `Product name must be at least ${VALIDATION.MIN_PRODUCT_NAME_LENGTH} characters`
    ),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  barcode: z.string().optional(),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
  stock: z
    .string()
    .min(1, 'Stock quantity is required')
    .refine(
      (val) =>
        !isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val)),
      {
        message: 'Stock must be a non-negative whole number',
      }
    ),
  description: z.string().optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;

// Post Schema
export const postSchema = z.object({
  title: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .min(
      VALIDATION.MIN_POST_TITLE_LENGTH,
      `Title must be at least ${VALIDATION.MIN_POST_TITLE_LENGTH} characters`
    ),
  body: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .min(
      VALIDATION.MIN_POST_BODY_LENGTH,
      `Content must be at least ${VALIDATION.MIN_POST_BODY_LENGTH} characters`
    ),
  userId: z.number(),
});

export type PostFormInputs = z.infer<typeof postSchema>;

// Category/Brand Schema
export const nameSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .min(
      VALIDATION.MIN_NAME_LENGTH,
      `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`
    ),
});

// Unit Schema
export const unitSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .min(
      VALIDATION.MIN_NAME_LENGTH,
      `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`
    ),
  shortName: z
    .string()
    .min(1, ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD)
    .max(
      VALIDATION.MAX_SHORT_NAME_LENGTH,
      `Short name must be less than ${VALIDATION.MAX_SHORT_NAME_LENGTH} characters`
    ),
});

export type NameFormInputs = z.infer<typeof nameSchema>;
export type UnitFormInputs = z.infer<typeof unitSchema>;
