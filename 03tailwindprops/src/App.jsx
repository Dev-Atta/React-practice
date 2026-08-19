import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Card from './Components/Card.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
   
  let myobj = {
    name: "Atta",
    age: "18"
  }

  let newarray = ["one", "two", "three", "four", "five"]


  return (
    <>
    <h1 className="bg-green-400 text-black p-4 
    rounded-xl">Checking Tailwind</h1> 
     
     <Card username="Harrry" channel="jeo" someobj={myobj} somearray={newarray} />  
       <Card username="Atta" channel="chai" someobj={myobj} somearray={newarray} />

     </>
  )
}
// we have given Two props to the card component. One is channel and the other is someobj. We can use these props in the card component to display the data passed from the parent component.

export default App
