import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


import Atta from "./atta.jsx"

function App() {
  const [count, setCount] = useState(0)


 // in jsx WE can Only return one element 
  return (
   // <h1>Hello Atta, Vite + React!</h1>
   <Atta />
  )
}

export default App
