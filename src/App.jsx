import { useState } from 'react';
import { getLocalStorage } from './utils';
import * as feat from './features';

export default function App() {
  const [todos, setTodos] = useState(getLocalStorage('todolist') || []);
  const [focusedTodo, setFocusedTodo] = useState((todos || []).filter((todo) => todo.isFocus));

  // console.log('focused todo:', focusedTodo[0].task);
  
  return (
    <main className='bg-gradient-to-br from-[#1a1d21] from-10% via-[#1f2125] via-30% to-[#28282c] h-screen w-full flex justify-center items-center gap-3 p-4 text-ivory'>
      <section className='w-[70%] h-screen flex flex-col justify-center items-center p-2'>
        <h1 className='text-[1.5rem] font-bold'>
          Ask the Eight Ball
        </h1>
        <small>
          When you no longer know what to do, let this magic ball decide for you!
        </small>
        <feat.Ball 
          todos = {todos}
          setTodos = {setTodos}
          focusedTodo = {focusedTodo}
          setFocusedTodo = {setFocusedTodo}
        />
      </section>    
      <aside>
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