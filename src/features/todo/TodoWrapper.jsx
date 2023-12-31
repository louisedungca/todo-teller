import { useEffect, useState } from 'react';
import { v4 as randomuuid } from 'uuid'; 
import { ArchiveBoxArrowDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { deleteItem, getLocalStorage, setLocalStorage } from '../../utils';
import * as c from './components';

function TodoWrapper() {
  const [todos, setTodos] = useState(getLocalStorage('todolist') || []);

  function addTodo(task) {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: randomuuid(),
        task: task,
        isCompleted: false,
        isEditing: false,
      },
    ]);
  }

  function deleteTodo(id) {
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(todo => todo.id !== id);
      deleteItem({ key: 'todolist', id });
      return newTodos;
    });
  }

  function toggleCompletion(id) {
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setLocalStorage('todolist', newTodos);
      return newTodos;
    });
  }

  useEffect(() => {
    setLocalStorage('todolist', todos);
  }, [todos]);

  return (
    <div>
      <h3 className='p-1 text-center uppercase'>
        to do list
      </h3>
      <c.TodoForm
        todos={todos}
        addTodo={addTodo}
      />

      <div className='w-[100%] flex flex-col gap-2 mt-3 px-2'>
        {todos.length > 0 &&          
          todos.map((todo) => (
            <div 
              key={todo.id}
              className={`flex justify-between bg-white text-black p-1 rounded-md `}
              onClick={() => toggleCompletion(todo.id)}
            >
              <span className={`cursor-pointer w-[80%] px-1 ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>{todo.task}</span> 
              <div className='w-[15%] flex gap-2 justify-around cursor-pointer'>
                <PencilSquareIcon width={20} />
                <ArchiveBoxArrowDownIcon width={20} onClick={() => deleteTodo(todo.id)}/>
              </div>            
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodoWrapper;
