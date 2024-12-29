import gsap from "gsap";
import { useEffect, useState } from "react";
import { setLocalStorage } from "../utils";

function Ball({
  todos,
  setTodos,
  setFocusedTodo,
  completeTask,
  setCompleteTask,
  setIsLoading,
}) {
  const [response, setResponse] = useState(null);
  const [isShaking, setIsShaking] = useState(true);

  function getRandomTodo() {
    setIsShaking(true);
    setIsLoading(true);
    setCompleteTask(false);
    const incompleteTodos = todos.filter((todo) => !todo.isCompleted);

    gsap.to("#ball-outer", {
      x: 5,
      y: 2.5,
      rotate: 15,
      ease: "wiggle",
      duration: 0.5,
      repeat: 3,
      yoyo: true,
    });

    if (incompleteTodos.length > 0) {
      const randomIndex = Math.floor(Math.random() * incompleteTodos.length);
      const selectedTodo = incompleteTodos[randomIndex];

      setTimeout(() => {
        setTodos((prevTodos) => {
          const updatedTodos = prevTodos.map((todo) =>
            todo.id === selectedTodo.id
              ? { ...todo, isFocus: true }
              : { ...todo, isFocus: false }
          );
          setLocalStorage("todolist", updatedTodos);
          setFocusedTodo([selectedTodo]);
          return updatedTodos;
        });

        setResponse(selectedTodo.task);
        setIsShaking(false);
        setIsLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    if (completeTask) {
      setResponse(null);
      setIsShaking(true);
    }
  }, [completeTask]);

  // wiggle animation
  gsap.registerEase("wiggle", (progress) => {
    return Math.sin(progress * Math.PI * 3);
  });

  return (
    <div
      className='cursor-pointer relative flex justify-center items-center bg-[#111] w-ball__outer aspect-square rounded-full shadow-ball__outer m-[3rem]'
      id='ball-outer'
      onClick={getRandomTodo}
    >
      <div className='flex justify-center items-center bg-[#F5F5F5] w-ball__inner aspect-square rounded-full shadow-ball__inner p-1 z-50'>
        <h3
          className={`p-1 text-black text-center font-medium ${
            isShaking
              ? "text-font8"
              : "text-fontResponse p-0.5 max-w-ball__inner aspect-square overflow-y-auto scrollbar-none"
          }`}
        >
          {isShaking ? "8" : response}
        </h3>
      </div>
      <div className='absolute top-0 bg-[#333] opacity-20 w-ball__spotlight aspect-square rounded-full'></div>
      <div className='absolute top-0 bg-[#666] opacity-20 w-ball__bg__shadow aspect-square rounded-full'></div>
      <div className='absolute top-[5px] bg-[#aaa] opacity-35 w-ball__upper__shadow aspect-[1/0.85] rounded-full'></div>
      <div className='absolute bottom-0 bg-[#333] opacity-25 w-ball__lower__shadow aspect-[0.95] rounded-full'></div>
    </div>
  );
}

export default Ball;
