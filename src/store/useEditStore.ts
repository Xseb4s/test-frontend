import { z } from 'zod';
import { create } from 'zustand';

// lo hice así, porque zustand es más "sencillo", pero en este caso (sin api) context da más maniobra

const paymentSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.number(),
  percentage: z.number(),
  date: z.string(),
  status: z.string(),
  paymentMethod: z.string(),
});

type Payment = z.infer<typeof paymentSchema>;

interface EditState {
  editingCreditId: number | null;
  setEditingCreditId: (id: number | null) => void;
  editPayment: (creditId: number, payment: Payment) => void;
  credits: { id: number; payments: Payment[] }[];
}

const useEditStore = create<EditState>((set) => ({
    editingCreditId: null,
    setEditingCreditId: (id) => set({ editingCreditId: id }),
    editPayment: (creditId, payment) => {
        set((state) => ({
          credits: state.credits.map((credit) =>
            credit.id === creditId
              ? {
                  ...credit,
                  payments: credit.payments.map((p) =>
                    p.id === payment.id ? { ...p, ...payment } : p
                  ),
                }
              : credit
          ),
        }));
      },      
    credits: [],
  }));  

export default useEditStore;