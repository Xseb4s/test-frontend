import { useStore } from '../store/useStore';
import AddPaymentForm from './AddPaymentForm';
import { FaChevronDown, FaPlus, FaRegCircle } from 'react-icons/fa';
import { useShowForm } from '../store/useShowForm';
import useEditStore from '../store/useEditStore';
import Form from './Form';
import { GoPencil } from 'react-icons/go';

const Credit = () => {
  const { credits } = useStore();
  //aquí en  vez  de  store usaría la api para  renderizar la info
  /* 
  const [data, setData] = useState([]);

  const getCredis = async () => {
    const { data, error } = await ReadCredits(); //esto vendría de services/creditos.routes
    error ? console.log(error) : setData(data);
  };
  useEffect(() => {
    getCredits();
  }, []);
  */
  const { showForm, setShowForm } = useShowForm();
  const { editingCreditId, setEditingCreditId } = useEditStore();

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleEdit = (creditId: number) => {
    setEditingCreditId(creditId);
  };

  const renderView = (credit: Credit) => {
    return !editingCreditId ? (
      credit.payments.map((payment) => (
        <li key={payment.id} className='flex flex-col items-center'>
          <FaRegCircle className='w-8 h-8  text-red-400 hover:text-blue-800 cursor-pointer' />
          <p className='font-bold text-xl'>{payment.title}</p>
          <p className='font-semibold'>
            {payment.amount}&nbsp;USD&nbsp;
            <span className='font-normal'>({payment.percentage}%)</span>
          </p>
          <p>{payment.date}</p>
        </li>
      ))
    ) : (
      <Form />
    );
  };

  return (
    <div>
      {credits.map((credit) => (
        <div key={credit.id}>
          <div className='flex justify-between px-5 items-center py-2  border-b border-gray-400 mb-4'>
            <h4 className='text-red-400 flex items-center gap-1 p-1'>
              Pagos <FaChevronDown />
            </h4>
            <div className='flex gap-4'>
              {!editingCreditId && (
                <button
                  type='button'
                  className='text-red-400 flex flex-row items-center gap-2 hover:text-white hover:bg-red-400 border-0 rounded-lg px-1'
                  onClick={() => handleEdit(credit.id)}
                >
                  Editar <GoPencil />
                </button>
              )}
              <p className='text-gray-400'>
                Por cobrar <span className='font-bold text-primary'>{credit.amount}&nbsp;USD</span>
              </p>
            </div>
          </div>
          <ul className='flex gap-4 overflow-x-auto items-center border border-gray-400 rounded-lg p-3'>
            {renderView(credit)}
            {showForm ? (
              <AddPaymentForm creditId={credit.id} />
            ) : (
              <FaPlus
                className='w-6 h-6 p-1 text-red-400 bg-gray-200 rounded-full cursor-pointer hover:scale-110'
                onClick={handleShowForm}
              />
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Credit;