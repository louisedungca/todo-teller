import { useEffect, useState } from 'react';
import { v4 as randomuuid } from 'uuid'; 
import { ArchiveBoxArrowDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { getLocalStorage, setLocalStorage } from '../../utils';
import * as c from './components';

function TodoWrapper() {
  const [todos, setTodos] = useState(getLocalStorage('todolist') || []);

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

  useEffect(() => {
    setLocalStorage('todolist', todos);

    // for checking only -- delete later
    console.log('to do:', todos);
  }, [todos]); 

  return (
    <div>
      <h3 className='p-1 text-center uppercase'>
        to do list
      </h3>
      <c.TodoForm
        todos = {todos}
        addTodo = {addTodo}
      />

      <div className='w-[100%] flex flex-col gap-2 mt-3 px-2'>
        {
          todos.length > 0 &&          
          todos.map((todo, index) => (
            <div 
              key={index}
              className='flex justify-between bg-white text-black p-1 rounded-md'
            >
              <span className='w-[85%] px-1'>{todo.task}</span> 
              <div className='w-[15%] flex gap-2 justify-around cursor-pointer'>
                <PencilSquareIcon width={20} />
                <ArchiveBoxArrowDownIcon width={20} />
              </div>            
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TodoWrapper
