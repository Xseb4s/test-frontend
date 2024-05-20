import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { FaRegCircle } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';

const schema: ZodType<{ title: string; status: 'pagado' | 'pendiente'; date: Date | null; pay: number }> = z.object({
  title: z.string().min(1, 'El título es requerido'),
  status: z.enum(['pagado', 'pendiente']).refine(val => val === 'pagado' || val === 'pendiente', {
    message: 'El estado es requerido',
  }),
  date: z.date().nullable().refine(date => date instanceof Date, {
    message: 'Fecha inválida',
  }),
  pay: z.number().min(0, 'El monto debe ser mayor o igual a cero'),
});

type FormData = z.infer<typeof schema>;

const Form: React.FC = () => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [formattedPay, setFormattedPay] = useState<string>('');

  const onSubmit: SubmitHandler<FormData> = (data) => {
    //devuelve objeto
    //pasar a aray de objetos (json)
    console.log(data);
  };

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(',', '.'));
    if (!isNaN(value)) {
      const formattedValue = value.toFixed(1).replace('.', ',');
      setFormattedPay(formattedValue);
    }
  }; 

  const minDate = new Date();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-primary flex flex-col items-center gap-2 w-fit'>
      <div>
        <FaRegCircle className='w-8 h-8  text-red-500'/>
      </div>
      <div>
        <input id="title" {...register('title')} placeholder='Nuevo' className='text-black'/>
        {errors.title && <p className='text-red-400'>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className='mr-1'>Estado</label>
        <select id="status" {...register('status')} className='text-black p-1'>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
        </select>
        {errors.status && <p className='text-red-400'>{errors.status.message}</p>}
      </div>

      <div>
        <input type="text" id="pay" value={formattedPay} onChange={handlePayChange} placeholder='$' className='text-black focus:outline-none'/>
        <span>USD</span>
      </div>

      <div className='flex flex-col'>
        <label htmlFor="date" className='mr-1'>Vence</label>
        <Controller
          name="date"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              placeholderText='--/--/----'
              onChange={(date) => field.onChange(date as Date)}
              dateFormat="dd/MM/yyyy"
              minDate={minDate}
              className='text-black p-1 custom-datepicker'
              locale='es'
            />
          )}
        />
        {errors.date && <p className='text-red-400'>{errors.date?.message}</p>}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default Form;
