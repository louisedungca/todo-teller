import { PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

function TodoForm({ addTodo }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  function onSubmit(formData) {
    const { todoItem } = formData;
    addTodo(todoItem);
    reset();
  }

  return (
    <div>
      <form 
        className='flex gap-1 p-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('todoItem', {
            required: 'Please enter a task!',
            maxLength: {
              value: 25,
              message: 'Maximum length is 25 characters',
            },
          })}
          type='text'
          placeholder='What do you wanna do?'
          className='w-[90%] rounded-md py-1 px-2 text-black'
        />

        <button 
          type='submit'
          className='border-white border-2 w-[10%] rounded-md p-1'
        >
          <PlusIcon />
        </button>
      </form>

      {errors.todoItem && (
        <span className='p-3 text-red-500'>{errors.todoItem.message}</span>
      )}      
    </div>
    
  );
}

export default TodoForm;
