import { XMarkIcon } from '@heroicons/react/24/solid';
import { deleteItem, setLocalStorage } from '../../../utils';

function CompletedTasks({ todos, setTodos }) {
  const completedTasks = todos.filter((task) => task.isCompleted);

  function deleteTodo(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      deleteItem({ 
        key: 'todolist', 
        id 
      });

      return newTodos;
    });
  }

  function clearCompletedTasks() {
    console.log('completedTasks:', completedTasks);
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
    setLocalStorage('todolist', newTodos);
  }

  return (
    <div className='flex flex-col'>
      {completedTasks.length > 0 &&
      <div className='flex justify-between pt-3 px-3'>
        <h3 className='uppercase text-center text-sm'>
          Completed Tasks
        </h3>
        <small 
          className='cursor-pointer capitalize text-center text-gray-500 hover:text-ivory'
          onClick={clearCompletedTasks}
        >
          Clear All
        </small>
      </div>
      }

      <div className='w-[100%] flex flex-col gap-2 mt-3 px-2'>
        {completedTasks.length > 0 &&
          completedTasks.map((task) => (
            <div 
              key={task.id}
              className='flex justify-between bg-white p-1 rounded-md line-through text-gray-500 text-xs'
            >
              <span className='w-[80%] px-1'>{task.task}</span>
              <XMarkIcon className='cursor-pointer w-4 hover:text-black' onClick={() => deleteTodo(task.id)} />        
            </div>
          ))}
      </div>
      
    </div>
  )
}

export default CompletedTasks
