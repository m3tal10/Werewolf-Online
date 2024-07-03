import React, { useContext } from 'react'
import { AuthContext } from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom'

export default function () {


        const {userName,setRoomName,setAction}=useContext(AuthContext)
        const navigate= useNavigate()
        //handling the joining lobby form
        const handleLobbyForm=(event)=>{
            navigate("../lobby")
            event.preventDefault()

            const form=event.target
            const lobbyNum=form.lobbyNum.value

            //accessing the join lobby api to send the player data back to the lobby collection
            
            fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/lobbyJoin/${userName}`,{
                method:'PUT',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({lobbyNum}),
            })
            .then(res=>res.json())
            .then(data=>{
                setAction(data)
            })

            setRoomName(lobbyNum)
            localStorage.setItem('roomName',lobbyNum)
            console.log(lobbyNum)
         
        }

        


  return (
    <div>

        <form onSubmit={handleLobbyForm} className='flex-col justify-center items-center'>
            <input className='bg-red-500' type='text' name='lobbyNum' placeholder='lobby name'></input>
            <button >Join</button>

        </form>



    </div>
  )
}
