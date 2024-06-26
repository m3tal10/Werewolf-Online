import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ContextApi/Context'

export default function Lobby() {


  const {userName,roomName,action,setAction}=useContext(AuthContext)

  const [playerData,setPlayerData]=useState([])
  const [temp, setTemp] = useState(0)
  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, [])
  
  useEffect(()=>{

    fetch(`http://localhost:5000/lobby/${roomName?roomName:userName}`)
    .then(res=>res.json())
    .then(data=>setPlayerData(data))
    console.log(playerData)
    setAction(null)
  }, [temp])


  

  

  return (
<>


<div className="text-center text-5vh">
    <p>Lobby: {playerData[0]?.playerName}</p>
</div>
<div className='w-screen h-[55vh] grid grid-cols-4 '>
{playerData.map(player=><div className="border-2 border-black flex justify-center items-center">{player?.playerName}</div>)}
     

    </div>

    <div className="h-[32vh] w-[100wh] border-2 border-red-500">

    </div>
    <div className="flex">
    <input className='w-[100vw] h-[8vh]' type="text" />
    <button>send</button>
    </div>

</>
  )
}
