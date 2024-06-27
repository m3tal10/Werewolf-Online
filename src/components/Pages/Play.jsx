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
      <div className="">
        <div className="flex justify-end w-[90vw] items-center gap-4 mt-2">
            <p>
              {userName?userName:''}
            </p>
            <button className='px-4 py-2 bg-red-500 text-bold text-[2vh] rounded-lg'>Logout</button>
        </div>
        <div className="w-[95vw] h-[80vh] flex flex-col justify-center items-center">


<Link onClick={handleLobbyCreate} to='lobby' className='text'>Create Room</Link><br/>
<Link to='join' className='text'>Join Room</Link><br/>
<Link to='../' className='text'>Back</Link><br/>



</div>
      </div>
  )
}
