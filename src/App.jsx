import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length , setLength] = useState(6)
  const [number , setNumberAllowed] = useState(false)
  const [charallowed  , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  const passwordGenerator =useCallback(() => {
    let pass = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number){
      str += "0123456789"
    }
    if(charallowed ){
      str+="~!@#$%^&*_+"
    }

    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()* str.length+1)
      pass+= str.charAt(char);
    }

    setPassword(pass)
  } ,[length , number, charallowed  , setPassword])
  
  const passwordRef =useRef(null)

  useEffect(()=>{
    passwordGenerator()
  },[length , number , charallowed , passwordGenerator])
  
  const passwordcopy  = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
    <div className="main   max-w-md mx-auto shadow-md text-orange-500 font-bold bg-gray-800 rounded-lg px-4 my-8" > 
    <h1 className='py-2 '>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full py-1 px-3" ref={passwordRef} placeholder="Password" readOnly />
        <button className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0" onClick={passwordcopy}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input type="range"
           min={6} max={30}
           value={length} 
           className='cursor-pointer '
            onChange={(e) => {setLength(e.target.value)}} />
          <label >Length : {length}</label>
        </div>
        <div className="flex item-center gap-x-1">
           <input
            type="checkbox"
            defaultChecked = {number} 
            id="numberInput"
            onChange={() =>{setNumberAllowed((prev) =>!prev);}}
         /> <label> number </label></div>
         <div className="flex item-center gap-x-1">
           <input
            type="checkbox"
            defaultChecked = {charallowed } 
            id="charInput"
            onChange={() =>{setCharAllowed((prev) =>!prev);}}
         /> <label>Character </label></div>
      </div>
     </div>
     
    </>
  )
}

export default App
