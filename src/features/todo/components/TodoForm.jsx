import { useForm } from 'react-hook-form';

function TodoForm({ todos, addTodo }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  function onSubmit(formData) {
    const { todoItem } = formData;
    addTodo(todoItem);
    reset();
    
    // for checking only -- delete later
    console.log('todoItem:', todoItem);
    console.log('@TodoForm - todos:', todos);
  }

  // for checking only -- delete later
  // console.log('@TodoForm - todos:', todos);
  // console.log('@TodoForm - addTodo:', addTodo);

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
          className='w-[80%] rounded-md py-1 px-2 text-black'
        />

        <button 
          type='submit'
          className='border-white border-2 w-[20%] rounded-md p-1'
        >
          Add
        </button>
      </form>

      {errors.todoItem && (
        <span className='p-3 text-red-500'>{errors.todoItem.message}</span>
      )}      
    </div>
    
  );
}

export default TodoForm;
