import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


import Atta from "./atta.jsx"

function App() {
  const [count, setCount] = useState(0)
  let username = "Atta";

 // in jsx WE can Only return one element 
  return (
   // <h1>Hello Atta, Vite + React!</h1>
   <>
   <Atta />
    <h1>Hello {username}, Vite + React!</h1>
  
  </>
  )
}
/* This {} is called as JSX, Only used to write conclusions */

export default App
