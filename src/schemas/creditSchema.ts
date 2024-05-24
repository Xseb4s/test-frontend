import { z } from 'zod';

export const creditSchema = z.object({
  amount: z.number().min(1, 'El valor del crédito debe ser mayor a 1 $'),
});