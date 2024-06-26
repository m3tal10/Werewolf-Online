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
    setAction(null)
  }, [temp])


  const handleChat=()=>{

    const message=document.getElementById('chat').value
    const user=userName

    console.log(message)

    fetch(`http://localhost:5000/chat/${roomName?roomName:userName}`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({message,user}),

  })
  .then(res=>res.json())
  .then(data=>{


  })


  }

  

  return (
<>


<div className="text-center text-5vh">
    <p>Lobby: {playerData[0]?.playerName}</p>
</div>
<div className='w-screen h-[55vh] grid grid-cols-4 '>
{playerData.map(player=><div className="border-2 border-black flex justify-center items-center">{player?.playerName}</div>)}
     

    </div>

    <div className="h-[32vh] w-[100wh] border-2 border-red-500 overflow-y-scroll">
    {playerData[0]?.Chats?.map(chat=><p className='text-[3vh]'><span className='text-bold text-red-400 '>{chat.body.user}:</span> {chat.body.message}</p>)}
    </div>
    <div className="flex">
    <input id='chat' className='w-[100vw] h-[8vh]' type="text" />
    <button onClick={handleChat}>send</button>
    </div>

</>
  )
}
