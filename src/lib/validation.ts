import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Product name must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  stock: z.number().int().nonnegative().optional()
});

export const OrderSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  productName: z.string(),
  price: z.number(),
  amount: z.number().optional(),
  orderId: z.string().optional(), // Incoming from Razorpay Checkout frontend
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Full address is required"),
  paymentStatus: z.string().optional(),
  dispatchStatus: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  paymentId: z.string().optional()
});

export const SettingsSchema = z.object({
  email: z.string().email("Invalid support email"),
  phone: z.string().min(10, "Invalid support phone")
});
