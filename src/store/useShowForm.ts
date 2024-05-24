import {create} from 'zustand'

interface PaymentFormState {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}
  
export const useShowForm = create<PaymentFormState>((set) => ({
    showForm: false,
    setShowForm: (show) => set({ showForm: show }),
}));