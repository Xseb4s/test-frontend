import { z } from 'zod';

export const paymentSchema = z.object({
  title: z.string().min(1, { message: 'El título es obligatorio' }),
  amount: z.number().min(0.01, { message: 'El monto debe ser mayor que 0' }),
  percentage: z.number().min(0).max(100),
  date: z.date(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;