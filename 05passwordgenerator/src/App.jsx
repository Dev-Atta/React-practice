import { useState, useCallback, useEffect, useRef } from 'react'




// useCallback(fn, dependencies)
function App() {
  const [count, setCount] = useState(0)
  
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const [password, setPassword] = useState('');
  
  // Using Ref Hook
  const password_ref = useRef(null)


const generatePassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXWYabcdefghijklmnopqrstuvwxy";
    // str now has 50 chars



    if(numberAllowed) str += "0123456789";
    if(characterAllowed) str += "!@#$%^&*(){}:|~"
// if both are true: 50 + 10 + 15 = 75 characters total.

    for(let i = 1; i<= lenght; i++) {
     let char = Math.floor((Math.random() * str.length) +1); // Gives us 1 to 50
     pass += str.charAt(char);
    }


    setPassword(pass);
  } ,[lenght, numberAllowed, characterAllowed, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  password_ref.current?.select();  // Hover slect Effect
 // password_ref.current?.setSelectionRange(0,3);  // Giving rannge To select
  window.navigator.clipboard.writeText(password)  // windows Only in react
},
[password])




  useEffect(()=>{
    generatePassword();
  },[lenght,numberAllowed,characterAllowed,generatePassword])
  
  return (
   <>
   <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">

  <h1 className="text-3xl text-white font-bold mb-6">Password Generator</h1>

  <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-4 bg-gray-800">

    <div className="flex mb-4 ">
      <input
        type="text"
        value={password}
        readOnly
        className="w-full py-2 px-3 text-white text-bold outline-none"
        ref={password_ref}  // Thaing Refrence USing useRef hook
      />
      <button className="bg-blue-600 text-white px-4 py-2"
       onClick={copyPasswordToClipboard}
      >
        Copy
      </button>
    </div>

    <div className="flex gap-4 text-white text-sm">
      <input
        type="range"
        min={6}
        max={100}
        value={lenght}
        onChange={(e) => {setLenght(e.target.value)}}
        className="cursor-pointer"
      />
      <label>Length: {lenght}</label>

      <input
        type="checkbox"
       
        checked={numberAllowed}
        onChange={() => setNumberAllowed(!numberAllowed)}  // if chanaged, then useCallback will check the Dependendency Array inside the generatepassword function
        // as seNumberallowed Is lying inside the dependency Array
      />
      <label>Numbers</label>

      <input
        type="checkbox"
        
        checked={characterAllowed}
        onChange={() => setCharacterAllowed(!characterAllowed)}
      />
      <label>Symbols</label>
    </div>

  </div>
</div>
   
   </>
  )
}

export default App
