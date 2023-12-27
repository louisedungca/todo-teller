import { useState } from 'react';
import * as c from './components';

function TodoWrapper() {
  return (
    <div>
      <h3 className='uppercase'>
        to do
      </h3>
      <c.TodoForm />
    </div>
  )
}

export default TodoWrapper
