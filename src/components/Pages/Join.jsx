import React, { useContext } from 'react'
import { AuthContext } from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom'

export default function () {


        const {userName,setRoomName,setAction}=useContext(AuthContext)
        const navigate= useNavigate()
        const handleLobbyForm=(event)=>{
            navigate("../lobby")
            event.preventDefault()

            const form=event.target
            const lobbyNum=form.lobbyNum.value


            
            fetch(`http://localhost:5000/lobbyJoin/${userName}`,{
                method:'PUT',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({lobbyNum}),
            })
            .then(res=>res.json())
            .then(data=>{
                setAction(data)
            })

            setRoomName(lobbyNum)
            console.log(lobbyNum)
         
        }

        


  return (
    <div>

        <form onSubmit={handleLobbyForm} className='flex-col justify-center items-center'>
            <input type='text' name='lobbyNum'></input>
            <button >Join</button>

        </form>



    </div>
  )
}
