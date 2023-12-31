import { useState } from 'react';
import { getLocalStorage } from '../utils';

function Ball() {
  const todos = getLocalStorage('todolist') || [];
  const [response, setResponse] = useState(null);

  function getRandomTodo() {
    console.log('Ball clicked!');
    const incompleteTodos = todos.filter(todo => !todo.isCompleted);

    if (incompleteTodos.length > 0) {
      const randomIndex = Math.floor(Math.random() * incompleteTodos.length);
      setResponse(incompleteTodos[randomIndex].task);
    }
  }

  return (
    <div 
      className='cursor-pointer relative flex justify-center items-center bg-[#111] w-[300px] aspect-square rounded-full shadow-ball__outer m-[3rem]'
      onClick={getRandomTodo}
    >
      <div className='flex justify-center items-center bg-[#F5F5F5] w-[150px] aspect-square rounded-full shadow-ball__inner p-1 z-50'>
        <h3 className='text-black text-[80%] font-medium p-1'>{response || '8'}</h3>
      </div>
      <div className='absolute top-0 bg-[#333] opacity-20 w-[250px] aspect-square rounded-full'></div>
      <div className='absolute top-0 bg-[#666] opacity-20 w-[175px] aspect-square rounded-full'></div>
      <div className='absolute top-[5px] bg-[#aaa] opacity-35 w-[65px] aspect-[1/0.85] rounded-full'></div>
      <div className='absolute bottom-0 bg-[#333] opacity-25 w-[150px] aspect-[0.95] rounded-full'></div>
    </div>
  );
}

export default Ball;
