import { z } from 'zod';

export const editSchema = z.object({

    id: z.number(),
    title: z.string().min(1, { message: 'El título es obligatorio' }),
    amount: z.number().min(0.01, { message: 'El monto debe ser mayor que 0' }),
    percentage: z.number().min(0).max(100),
    date: z.date(),
     
});

export type EditSchema = z.infer<typeof editSchema>;