import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../ContextApi/Context'

export default function Play() {

    const {userName}=useContext(AuthContext)
    const handleLobbyCreate=()=>{

        const lobbyName={userName}
        fetch(`http://localhost:5000/lobby/${userName}`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify(lobbyName),

        })
        .then(res=>res.json())
        .then(data=>{

   
        })

    }

  return (
<div className="w-screen h-screen flex flex-col justify-center items-center">


        <Link onClick={handleLobbyCreate} to='lobby' className='text'>Create Room</Link><br/>
        <Link to='join' className='text'>Join Room</Link><br/>
        <Link to='../' className='text'>Back</Link><br/>



</div>
  )
}
