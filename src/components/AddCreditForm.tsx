import React from 'react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { creditSchema } from '../schemas/creditSchema';

const AddCreditForm: React.FC = () => {
  const addCredit = useStore((state) => state.addCredit);
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      amount: 0,
    }
  });

  const onSubmit = (data: { amount: number }) => {
    //aquí usaría la api para crear los créditos
    /*
    const {error} = await SaveCredit(data); //esto vendría de services/creditos.routes
    if(error){
      mensaje de 'no se pudo agregar crédito correctamente'
      return;
    }
      de lo contrario 'Crédito agregado exitosamente",
      reset(); 
    */
    addCredit(data.amount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nuevo Crédito:&nbsp;
        <input
          className='outline outline-1 mx-4 px-1 w-20'
          type="number"
          {...register('amount', { valueAsNumber: true })}
        />
      </label>
      {errors.amount && <p className='text-red-400'>{errors.amount.message}</p>}
      <button type="submit" className='text-red-400 hover:bg-red-400 hover:text-white p-1 rounded-lg'>Crear</button>
    </form>
  );
};

export default AddCreditForm;