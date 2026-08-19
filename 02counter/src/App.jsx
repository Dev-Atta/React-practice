import { useState } from 'react' // Use State is a hook that allows you to add state to functional components in React.
//It lets you declare state variables and update them, triggering re-renders when the state changes.
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() { 
  //let counter = 5;

  let [counter, setCounter] = useState(15) // Making A counter variable using useState hook, and setting the initial value to 15. The useState hook returns an array with two elements: the current state value (counter) and a function to update that state (setCounter).
  // [Valriable, Function to update the variable] = useState(initial value)

  const addValue = () => {
    console.log("add value clicked");   
   counter = counter + 1;
   console.log("counter value is : ", counter);
   setCounter(counter); // This line correctly updates the state using the setCounter function, which will trigger a re-render of the component with the new counter value.

  }

  const subtractValue = () => {
    console.log ("Subtarct Value us Clicked");
    counter = counter - 1;
    console.log("counter value is : ", counter);
    setCounter(counter); // This line correctly updates the state using the setCounter function, which will trigger a re-render of the component with the new counter value.
  }

  const setValue = (value) => {
    if (value < 0) {
      return 0;
  }
   else if (value > 20){
     return 20;
   }
   else {
     return value;
   }
    
  }

let final_result = setValue(counter); // This line calls the setValue function with the current counter value, but it doesn't return anything. The function modifies the value but doesn't return it, so final_result will be undefined.

  return (
    <> 
    <h1> Starting POINT  </h1>
    <h2> Counter value : {final_result}</h2>
 
    <button onClick={addValue}> ADD VALUE {final_result} </button>
    <br />
    <button onClick={subtractValue}> SUBTRACT VALUE {final_result} </button> 
     <p> Counter = {final_result} </p>
     </>
  )
}

export default App
