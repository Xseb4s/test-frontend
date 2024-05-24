import { create } from 'zustand';
import { z } from 'zod';

const paymentSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.number(),
  percentage: z.number(),
  date: z.string(),
  status: z.string(),
  paymentMethod: z.string(),
});

const creditSchema = z.object({
  id: z.number(),
  amount: z.number(),
  payments: z.array(paymentSchema),
});

type Payment = z.infer<typeof paymentSchema>;
type Credit = z.infer<typeof creditSchema>;

type StoreState = {
  credits: Credit[];
  addCredit: (amount: number) => void;
  addPayment: (creditId: number, payment: Payment) => void;
};

export const useStore = create<StoreState>((set) => ({
  credits: [],
  addCredit: (amount: number) => {
    set((state) => ({
      credits: [
        ...state.credits,
        {
          id: Date.now(),
          amount,
          payments: [],
        },
      ],
    }));
  },
  addPayment: (creditId, payment) => {
    set((state) => ({
      credits: state.credits.map((credit) =>
        credit.id === creditId
          ? { ...credit, payments: [...credit.payments, payment] }
          : credit
      ),
    }));
  },
}));