import { useEffect, useState, useRef } from 'react';
import { v4 as randomuuid } from 'uuid'; 
import { ArchiveBoxArrowDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { deleteItem, getLocalStorage, setLocalStorage } from '../../utils';
import * as c from './components';

function TodoWrapper() {
  const [todos, setTodos] = useState(getLocalStorage('todolist') || []);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const inputRef = useRef(null);

  function addTodo(task) {
    if (editTaskId) {
      setTodos((prevTodos) => {
        const editedTodos = prevTodos.map((todo) =>
          todo.id === editTaskId ? { ...todo, task, isEditing: false } : todo
        );
        setLocalStorage('todolist', editedTodos);
        return editedTodos;
      });
      setEditTaskId(null);
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: randomuuid(),
          task: task,
          isCompleted: false,
          isEditing: false,
        },
      ]);
    }
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      deleteItem({ key: 'todolist', id });
      return newTodos;
    });
  }

  function toggleCompletion(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setLocalStorage('todolist', newTodos);

      const completedTask = newTodos.find((todo) => todo.id === id);
      if (completedTask && completedTask.isCompleted) {
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          completedTask,
        ]);
      }

      return newTodos;
    });
  }

  const handleEditClick = (id) => {
    setEditTaskId(id);
  };

  const handleBlur = () => {
    if (editTaskId) {
      const taskToEdit = todos.find((todo) => todo.id === editTaskId);
      setEditTaskId(null);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTaskId ? { ...todo, isEditing: false } : todo
        )
      );
      addTodo(taskToEdit.task);
    }
  };

  useEffect(() => {
    setLocalStorage('todolist', todos);
  }, [todos]);

  return (
    <div className='flex flex-col gap-3'>
      <h3 className='p-1 text-center uppercase'>
        to do list
      </h3>
      <c.TodoForm
        todos={todos}
        addTodo={addTodo}
        editTask={editTaskId ? todos.find((todo) => todo.id === editTaskId) : null}
        inputRef={inputRef}
        onBlur={handleBlur}
      />

      <div className='w-[100%] flex flex-col gap-2 mt-3 px-2'>
        {todos.length > 0 &&          
          todos.map((todo) => (
            // Render only if the task is not completed
            !todo.isCompleted && (
              <div 
                key={todo.id}
                className={`flex justify-between bg-white text-black p-1 rounded-md `}
              >
                {editTaskId === todo.id ? (
                  <input
                    ref={inputRef}
                    value={todo.task}
                    onChange={(e) => setTodos((prevTodos) =>
                      prevTodos.map((t) => (t.id === todo.id ? { ...t, task: e.target.value } : t))
                    )}
                    onBlur={handleBlur}
                    className='w-[80%] px-1'
                  />
                ) : (
                  <span 
                    className={`cursor-pointer w-[80%] px-1 ${todo.isCompleted ? 'line-through text-gray-500' : ''}`} 
                    onClick={() => toggleCompletion(todo.id)}
                  >
                    {todo.task}
                  </span>
                )}
                <div className='w-[15%] flex gap-2 justify-around cursor-pointer'>
                  <PencilSquareIcon width={20} onClick={() => handleEditClick(todo.id)} />
                  <ArchiveBoxArrowDownIcon width={20} onClick={() => deleteTodo(todo.id)}/>
                </div>            
              </div>
            )
          ))}
      </div>

      <c.CompletedTasks 
        completedTasks={completedTasks} 
      />
    </div>
  );
}

export default TodoWrapper;
