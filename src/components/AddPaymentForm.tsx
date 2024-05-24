import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, PaymentSchema } from '../schemas/paymentSchema';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegCircle } from 'react-icons/fa';
import { useShowForm } from '../store/useShowForm';

interface AddPaymentFormProps {
  creditId: number;
}

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ creditId }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      title: '',
      amount: 0,
      percentage: 0,
      date: new Date(),
    }
  });

  const addPayment = useStore((state) => state.addPayment);
  const {setShowForm} =  useShowForm()

  const [percentage, setPercentage] = useState<number>(0);

  const restar = () => {
    setPercentage(percentage-1);
  };

  const sumar = () => {
    setPercentage(percentage + 1)
  };

  const onSubmit = (data: PaymentSchema) => {
    //aquí usaría la api para crear los pagos de un crédito en especifico
    /*
    const {error} = await SavePaymentsByCreditId(data); //esto vendría de services/pagos.routes
    if(error){
      mensaje de 'no se pudo agregar pago correctamente'
      return;
    }
      de lo contrario 'Pago agregado exitosamente",
      reset(); 
    */
    const formattedDate = data.date.toISOString().split('T')[0];
    const newPayment = {
      id:Date.now(),
      ...data,
      date: formattedDate,
      status: 'pendiente',
      paymentMethod: 'por determinar',
      percentage: percentage,
    };
    addPayment(creditId, newPayment);
    reset();
    setShowForm(false)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-64 items-center gap-2'>
      <FaRegCircle className='w-8 h-8  text-red-500'/>
      <input
        type="text"
        placeholder='Nuevo pago'
        className='outline outline-1 w-full'
        {...control.register('title')}
      />
      {errors.title && <p className='text-red-400'>{errors.title.message}</p>}

      <div className='flex gap-2 border border-black w-full'>
        <input
          type="number"
          placeholder='Monto'
          className='outline outline-1 w-full'
          {...control.register('amount', { valueAsNumber: true })}
        />
        <span className='px-1'>USD</span>
      </div>
      {errors.amount && <p className='text-red-400'>{errors.amount.message}</p>}

      <div className='flex gap-2 w-full'>
        <CiCircleMinus className='w-7 h-7 text-red-400 cursor-pointer' onClick={restar} />

        <div className='flex gap-2 border border-black'>
          <input
            type="number"
            className='outline-none w-full'
            value={percentage}
            readOnly
          />
          <span className='px-1'>%</span>
        </div>
        <CiCirclePlus className='w-7 h-7 text-red-400 cursor-pointer' onClick={sumar} />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="date" className='mr-1 text-gray-400'>Vence</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div className='flex items-center gap-2'>
              <MdOutlineDateRange className='w-5 h-5 text-red-400' />
              <ReactDatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className='text-red-400 p-1 custom-datepicker cursor-pointer'
              />
            </div>
          )}
        />

        {errors.date && <p className='text-red-400'>{errors.date.message}</p>}
      </div>

      <button type="submit" className='text-red-400 hover:bg-red-400 hover:text-white p-1 rounded-lg'>Agregar</button>
    </form>
  );
};

export default AddPaymentForm;