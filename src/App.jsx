import { useState } from "react";
import { getLocalStorage } from "./utils";
import * as feat from "./features";

export default function App() {
  const [todos, setTodos] = useState(getLocalStorage("todolist") || []);
  const [isLoading, setIsLoading] = useState(false);
  const [completeTask, setCompleteTask] = useState(false);
  const [focusedTodo, setFocusedTodo] = useState(
    (todos || []).filter((todo) => todo.isFocus)
  );

  return (
    <main className='w-full h-full flex justify-center items-center px-20 py-4 text-ivory max-[768px]:flex-col max-[768px]:px-6 overflow-y-auto scrollbar-none'>
      <section className='w-2/3 max-[768px]:w-full h-fit md:h-full flex flex-col justify-center items-center py-2'>
        <h1 className='text-[1.5rem] font-bold'>Ask the Eight Ball</h1>
        <small>
          When you don&apos;t know where to start on your to do, let this magic
          ball decide for you!
        </small>
        <feat.Ball
          todos={todos}
          setTodos={setTodos}
          focusedTodo={focusedTodo}
          completeTask={completeTask}
          setFocusedTodo={setFocusedTodo}
          setCompleteTask={setCompleteTask}
          setIsLoading={setIsLoading}
        />
      </section>
      <aside className='md:w-2/3 lg:w-1/3 max-[768px]:w-full h-full'>
        <feat.TodoWrapper
          todos={todos}
          setTodos={setTodos}
          focusedTodo={focusedTodo}
          completeTask={completeTask}
          setCompleteTask={setCompleteTask}
          isLoading={isLoading}
        />
      </aside>
    </main>
  );
}
