function CompletedTasks({ completedTasks }) {
  console.log('Completed Tasks:', completedTasks);

  return (
    <div className='flex flex-col'>
      {completedTasks.length > 0 &&
        <h3 className='uppercase text-center pt-3 text-sm'>
          Completed Tasks
        </h3>
      }

      <div className='w-[100%] flex flex-col gap-2 mt-3 px-2'>
        {completedTasks.length > 0 &&
          completedTasks.map((task) => (
            <div 
              key={task.id}
              className='flex justify-between bg-white text-black p-1 rounded-md line-through text-gray-500 text-xs'
            >
              <span className='w-[80%] px-1'>{task.task}</span>
              <div className='w-[15%] flex gap-2 justify-around cursor-pointer'>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CompletedTasks
