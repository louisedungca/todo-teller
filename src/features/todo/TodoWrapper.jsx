import { ArchiveBoxArrowDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useEffect, useState, useRef } from 'react';
import { v4 as randomuuid } from 'uuid'; 
import { deleteItem, setLocalStorage } from '../../utils';
import * as global from '../../components';
import * as c from './components';

function TodoWrapper({ todos, setTodos, focusedTodo, setFocusedTodo, completeTask, setCompleteTask }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
          isFocus: false,
        },
      ]);
    }
  }

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

  function toggleCompletion(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      const focusedTask = newTodos.find((todo) => todo.id === id);

      setCompleteTask(focusedTask?.isCompleted || false);
      setLocalStorage('todolist', newTodos);
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
  }, [todos, setTodos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTaskId]);

  useEffect(() => {
    if (focusedTodo.length > 0) {
      setIsLoading(true);

      const focusTimeout  = setTimeout(() => {
        setIsLoading(false);        
      }, 2000);

      return () => clearTimeout(focusTimeout);
    }
  }, [focusedTodo, setFocusedTodo]);

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

      <div className='w-[100%] flex flex-col gap-2 px-2'>
        {isLoading ? (
          <div className='w-[100%] flex flex-col gap-2'>
            <small className='capitalize'>Focus</small>
            <div className='flex justify-between items-center bg-white text-black p-1 rounded-md w-1/6 h-8'>
              <span className='w-full px-1 text-sm'>
                <global.EllipsisLoader />
              </span>
            </div>
            {todos.every((todo) => todo.isCompleted) ? null : (<small className='capitalize pt-2'>Next</small>)}
          </div>
        ) : (
          <div className='w-[100%] flex flex-col gap-2'>
            <small className='capitalize'>Focus</small>
            {focusedTodo.map((todo, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center h-8 bg-white text-black p-1 rounded-md outline-teal-500 outline-4 outline`}
              >
                <span
                  className={`cursor-pointer w-[80%] px-1 text-sm ${
                    (todo.isCompleted || completeTask) ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={() => {
                    toggleCompletion(todo.id);
                  }}
                >
                  {todo.isCompleted || completeTask ? (
                    <span className='line-through text-gray-500'>{todo.task}</span>
                  ) : (
                    <span>{todo.task}</span>
                  )}
                </span>
              </div>
            ))}
            {todos.every((todo) => todo.isCompleted) ? null : (<small className='capitalize pt-2'>Next</small>)}
          </div>
        )}

        {todos.length > 0 && (
          <div className='flex flex-col gap-2 p-2 overflow-y-auto max-h-[250px]'>
            {todos
            .filter((todo) => !todo.isCompleted && !todo.isFocus)
            .map((todo) => (           
              <div
                key={todo.id}
                className={`flex justify-between items-center h-8 bg-white text-black p-1 rounded-md`}
              >
                {editTaskId === todo.id ? (
                  <input
                    ref={inputRef}
                    value={todo.task}
                    onChange={(e) =>
                      setTodos((prevTodos) =>
                        prevTodos.map((task) =>
                          task.id === todo.id
                            ? { ...task, task: e.target.value }
                            : task
                        )
                      )
                    }
                    onBlur={handleBlur}
                    className='w-[80%] px-1'
                  />
                ) : (
                  <span
                    className={`cursor-pointer w-[80%] px-1 text-sm ${
                      todo.isCompleted ? 'line-through text-gray-500' : ''
                    }`}
                    onClick={() => toggleCompletion(todo.id)}
                  >
                    {todo.task}
                  </span>
                )}
                <div className='w-[15%] flex gap-2 justify-around items-center cursor-pointer'>
                  <PencilSquareIcon
                    className='hover:opacity-45 w-15'
                    onClick={() => handleEditClick(todo.id)}
                  />
                  <ArchiveBoxArrowDownIcon
                    className='hover:opacity-45 w-15'
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <c.CompletedTasks 
        todos={todos} 
        setTodos = {setTodos}
      />
    </div>
  );
}

export default TodoWrapper;