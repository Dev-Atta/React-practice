import { useState } from 'react'

function App() {
  const [color, setColor] = useState("bg-lime-200")

  return (
    <>
      <div className={`w-full h-screen flex justify-center duration-200 ${color}`}>
      </div>
    
      <div className="flex-wrap flex fixed justify-center bottom-12 inset-x-0">
      <div className="bg-white rounded-3xl justify-center items-center flex px-2 py-2 gap-2">
         <div className="outline-none rounded-full px-4 py-2 bg-red-500 text-white shadow-lg">
          <button onClick={() => setColor("bg-red-500")}>Red</button>
         </div>
          <div className="outline-none rounded-full px-4 py-2 bg-green-500 text-white shadow-lg">
           <button onClick={()=> setColor("bg-green-500")}>Green</button>
          </div>
           <div className="outline-none rounded-full px-4 py-2 bg-blue-500 text-white shadow-lg">
            <button onClick={() => setColor("bg-blue-500")}>Blue</button>
           </div>
            <div className="outline-none rounded-full px-4 py-2 bg-yellow-500 text-white shadow-lg">
             <button onClick={() => setColor("bg-yellow-500")}>Yellow</button>
            </div>
             <div className="outline-none rounded-full px-4 py-2 bg-purple-500 text-white shadow-lg">
              <button onClick={() => setColor("bg-purple-500")}>Purple</button>
             </div>
             <div className="outline-none rounded-full px-4 py-2 bg-pink-500 text-white shadow-lg">
              <button onClick={() => setColor("bg-pink-500")}>Pink</button>
             </div>
             <div className="outline-none rounded-full px-4 py-2 bg-black text-white shadow-lg">
              <button onClick={() => setColor("bg-black")}>Black</button>
             </div>
            
      </div>
      </div>
    </>
  )
}

export default App