import { useState } from 'react';
import { useStore } from '../store/useStore';
import { FaRegCircle } from 'react-icons/fa';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineDateRange } from 'react-icons/md';
import ReactDatePicker from 'react-datepicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditSchema, editSchema } from '../schemas/editSchema';
import useEditStore from '../store/useEditStore';

// este archivo lo guardaría en credit/[idCredit]/index.tsx
// el componente recibiría el id y usaría la api de leer los pagos por el id del crédito 
/*
const getDataPaymentsByCreditId = async () => { 
  const {error} = await ReadPaymentsByCreditId(idCredit);  // esto vendría de services/pagos.routes
}
iteraría la cantidad de pagos sobre la api de update de UpdatePaymentsById(idPayment)
*/

const Form = () => {
  const credits = useStore((state) => state.credits);
  const editPayment = useEditStore((state) => state.editPayment);
  const { editingCreditId } = useEditStore();
  const credit = credits.find((c) => c.id === editingCreditId);
  const [percentage, setPercentage] = useState<number>(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
  });


  const restar = () => {
    setPercentage((prevPercentage) => prevPercentage - 1);
  };

  const sumar = () => {
    setPercentage((prevPercentage) => prevPercentage + 1);
  };

  const onSubmit = (data: EditSchema) => {
    const editPaymentSchema = {
      ...data,
      percentage: percentage,
    };
    editPayment(editingCreditId, editPaymentSchema);
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row w-64 items-center gap-2 mr-10'>
      {credit?.payments.map((payment) => (
        <div key={payment.id} className='flex flex-col items-center'>
          <FaRegCircle className='w-8 h-8 text-red-500' />
          <input
            type='text'
            placeholder='Nuevo pago'
            className='outline outline-1 w-full'
            defaultValue={payment.title}
            {...control.register('title')}
          />

          <div className='flex gap-2 border border-black w-full'>
            <input
              type='number'
              placeholder='Monto'
              className='outline outline-1 w-full'
              defaultValue={payment.amount}
              {...control.register('amount', { valueAsNumber: true })}
            />
            <span className='px-1'>USD</span>
          </div>
          

          <div className='flex gap-2 w-full'>
            <CiCircleMinus className='w-7 h-7 text-red-400 cursor-pointer' onClick={restar} />

            <div className='flex gap-2 border border-black'>
              <input
                type='number'
                className='outline-none w-full'
                defaultValue={percentage}
                readOnly
              />
              <span className='px-1'>%</span>
            </div>
            <CiCirclePlus className='w-7 h-7 text-red-400 cursor-pointer' onClick={sumar} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='date' className='mr-1 text-gray-400'>
              Vence
            </label>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <div className='flex items-center gap-2'>
                  <MdOutlineDateRange className='w-5 h-5 text-red-400' />
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat='dd/MM/yyyy'
                    minDate={new Date()}
                    className='text-red-400 p-1 custom-datepicker cursor-pointer'
                  />
                </div>
              )}
            />

          </div>
        </div>
      ))}

      <button type='submit' className='text-red-400 hover:bg-red-400 hover:text-white rounded-lg px-1'>
        Guardar
      </button>
    </form>
  );
};

export default Form;