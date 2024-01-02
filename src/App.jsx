import { useState } from 'react';
import { getLocalStorage } from './utils';
import * as feat from './features';

export default function App() {
  const [todos, setTodos] = useState(getLocalStorage('todolist') || []);
  const [focusedTodo, setFocusedTodo] = useState((todos || []).filter((todo) => todo.isFocus));

  // console.log('focused todo:', focusedTodo[0].task);
  
  return (
    <main className='bg-gradient-to-br from-[#1a1d21] from-10% via-[#1f2125] via-30% to-[#28282c] h-screen w-full flex justify-center items-center px-20 py-4 text-ivory max-[768px]:flex-col max-[768px]:px-6'>
      <section className='w-3/4 h-screen flex flex-col justify-center items-center py-2 max-[768px]:w-full'>
        <h1 className='text-[1.5rem] font-bold'>
          Ask the Eight Ball
        </h1>
        <small>
          When you don't know where to start on your to do, let this magic ball decide for you!
        </small>
        <feat.Ball 
          todos = {todos}
          setTodos = {setTodos}
          focusedTodo = {focusedTodo}
          setFocusedTodo = {setFocusedTodo}
        />
      </section>    
      <aside className='w-1/4 max-[768px]:w-full'>
        <feat.TodoWrapper
          todos = {todos}
          setTodos = {setTodos}
          focusedTodo = {focusedTodo}
          setFocusedTodo = {setFocusedTodo}
        />
      </aside>        
    </main>    
  )
}