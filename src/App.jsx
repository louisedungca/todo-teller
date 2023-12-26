import * as c from './components';

export default function App() {
  return (
    <main className='bg-gradient-to-br from-[#1a1d21] from-10% via-[#1f2125] via-30% to-[#28282c] h-screen w-full flex justify-center items-center flex-col gap-3 text-ivory'>
      <h1 className='text-[1.5rem] font-bold'>
        Ask the Eight Ball
      </h1>
      <small>
        When you no longer know what to do, let the Magic Eight Ball decide for you!
      </small>
      <c.Ball />
    </main>    
  )
}