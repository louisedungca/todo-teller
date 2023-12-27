import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as randomuuid } from 'uuid'; 

function TodoForm() {
  const { register, handleSubmit, reset } = useForm();
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: randomuuid(),
        task: todo,
        isCompleted: false,
        isEditing: false,
      },
    ]);
  }

  // for checking only -- delete later
  useEffect(() => {
    console.log('to do:', todos);
  }, [todos]); 

  function onSubmit(formData) {
    const { todoItem } = formData;
    addTodo(todoItem);

    // reset form
    reset();
    // for checking only -- delete later
    console.log('todoItem:', todoItem);
  }

  return (
    <form 
      className='flex gap-1 p-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('todoItem', {
          required: true,
          maxLength: 25,
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
  );
}

export default TodoForm;
