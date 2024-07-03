import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ContextApi/Context'
import { useTimer } from 'react-timer-hook';
export default function Lobby({expiryTimestamp}) {
  const [seconds, setSeconds] = useState(1000000); 
  const [playerData,setPlayerData]=useState([])
  const [player,setPlayer]=useState()
  useEffect(() => {
    const timer = setInterval(() => {

      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000); 

    return () => clearInterval(timer);
  }, []); 
  const [currentRound,setCurrentRound]=useState('lobby')

  useEffect(() => {
    if(playerData[0]?.playerName==userName){
     if (seconds === 0 && currentRound=='discussion') {

       setCurrentRound('vote')
       handleActionConfirmed()
       handleRounds()
       setSeconds(90); 
     }
     else if(seconds==0 && currentRound=='vote'){
       setCurrentRound('night')
       setSeconds(120)
 
       handleRounds()
     }
     else if(seconds==0 && currentRound=='night'){
       handlevoteConfirmed()
       setCurrentRound('discussion')
       setSeconds(90)
       handleRounds()
     }
     else if(seconds==0 && currentRound=='lobby'){
 
       setSeconds(360)
       handleRounds()
     }
    }
    else{
      if (seconds==0 && currentRound=='discussion') {
        setSeconds(15)
  
        handleActionConfirmed()
  
  
      }
      else if(seconds==0 && currentRound=='vote'){
  
        setSeconds(20)
  
  
      }
      else if(seconds==0 && currentRound=='night'){
        setSeconds(30)
  
      }
      else if( seconds==0 && currentRound=='lobby'){
  
        setSeconds(50)
  
      }
     }
    
   }, [seconds,currentRound]);

   useEffect(()=>{
    setCurrentRound(playerData[0]?.round)
   },[playerData[0]?.round])


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 1000)
  }, [])
 
  

  const {userName,roomName,action,setAction}=useContext(AuthContext)
  let readyCount=0
  const [start,setStart]=useState(false)

  const [temp, setTemp] = useState(0)
  const [playerRole,setPlayerRole]=useState(null)
  

 
  
  useEffect(()=>{

    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/lobby/${roomName?roomName:userName}`)
    .then(res=>res.json())
    .then(data=>setPlayerData(data))
    setAction(null)
    //to scroll with message
    if(playerData[0]?.start==='yes'){
      setStart(true)
    }

    if(!playerRole){
  
      setPlayerRole(playerData?.find(player=>userName==player?.playerName)?.role)
    }
    if(!player){
      setPlayer(playerData?.find(player=>userName==player?.playerName))
    }
    
 
  }, [temp])

  useEffect(()=>{
    if(currentRound=='lobby'){
      setSeconds(360)
    }
  },[start])

  const handleRounds=async()=>{


    const start=playerData[0]?.start
    const roomInfo=roomName?roomName:userName
    const body={roomInfo,currentRound}


    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/session/round`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body),

  })
    .then()
    .then(data=>{

  })

 
  }


  const handleActionConfirmed=async()=>{

    const roomInfo=roomName?roomName:userName
    const stage=currentRound
    const body={roomInfo,stage}
    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/actionConfirm`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body),

  })
  .then(res=>res.json())
  .then(data=>{
    
  })

  }



  const handleChat=(event)=>{
    event.preventDefault()
    const message=document.getElementById('chat').value
    const user=userName



    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/chat/${roomName?roomName:userName}`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({message,user}),

  })
  .then(res=>res.json())
  .then(data=>{


  })


  document.getElementById('chat').value=''
  var element = document.getElementById(`end`);
  element.scrollIntoView()


  }


  // for handling the ready and not ready buttons
  const handleReady=()=>{

    const roomInfo=roomName?roomName:userName
    const room={roomInfo}

    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/ready/${userName}`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(room),

  })
  .then(res=>res.json())
  .then(data=>{

  })


  }

  

  const handleNotReady=()=>{

    const roomInfo=roomName?roomName:userName

    const room={roomInfo}

    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/notready/${userName}`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(room),

  })
  .then(res=>res.json())
  .then(data=>{

  })

  }

  //for the visibility of start button
  const handleStartButton=(readyCount)=>{


    playerData.map(player=>player.ready=='yes'?readyCount++:'')

    if (readyCount==playerData.length){
      return true
    }

  }

  const ready=handleStartButton(readyCount)

  const handleStart=()=>{
    setCurrentRound('discussion')
    setSeconds(130)
    const roomInfo=roomName?roomName:userName
    
    const room={roomInfo}
    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/start`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(room),

  })
  .then(res=>res.json())
  .then(data=>{

  })
       


    }


   const handlePlayerAction=(action,victim)=>{

    const roomInfo=roomName?roomName:userName
    const body={playerRole,roomInfo,action,victim,userName}

    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/action`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body),

  })
  .then(res=>res.json())
  .then(data=>{

  })

   } 

   const handlePlayerVote=(victim)=>{

    const roomInfo=roomName?roomName:userName
    const body={roomInfo,victim,userName}

    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/vote`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body),

  })
  .then(res=>res.json())
  .then(data=>{

  })

   } 

   const handlevoteConfirmed=async()=>{

    const roomInfo=roomName?roomName:userName
    const stage=currentRound
    const body={roomInfo,stage}
    fetch(`https://project-warewolf-aliashrafabirs-projects.vercel.app/voteconfirm`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body),

  })
  .then(res=>res.json())
  .then(data=>{
    
  })


  }

  const handleJesterWin=()=>{
    
    if(playerRole=='jester' && playerData?.win=='yes'){
      return true
    }

  }
   
   

  return (
<>


<div className="text-center text-5vh flex justify-center items-center gap-8">
<p>{playerRole=='jester'?player.win=='no'?`target: ${player.target}`:'':''}</p>
    <p>{playerRole=='jester'?player.win=='yes'?'target killed':'':''}</p>

    <p>{formatTime(seconds)}</p>


    <div className="">
      Round: {playerData[0]?.round}
    </div>



    {playerRole?<p>Role : {playerRole}</p>:''}
    {roomName?'':ready?<button onClick={handleStart} className={`px-4 py-2 bg-green-500 text-bold rounded-lg ${start?'hidden':''}`}>start</button>:''}
    <p>Lobby: {playerData[0]?.playerName}</p>

    {playerData.find(player=>player.playerName==userName)?.ready=='yes'?<button onClick={handleNotReady} className={`px-4 py-2 bg-red-500 text-bold rounded-lg ${start?'hidden':''}`}>Not Ready</button>:<button onClick={handleReady} className={`px-4 py-2 bg-green-500 text-bold rounded-lg ${start?'hidden':''}`}>ready</button>}

</div>
<div className='w-screen lg:h-[45vh] grid grid-cols-4 m-[2vh] gap-2 min-h-[20vh]'>
{playerData.map(player=><div className="border-2 border-black flex flex-col justify-center items-center">{player?.playerName}<br/>
{start?'':`ready :${player.ready} `}<br/>
<p>{player.alive}</p><br></br>
<p>protected:{player.isProtected}</p>
<p>attacked:{player.isAttacked}</p>
<p>werewolfVote:{player.werewolfVote}</p>
<p>Vote:{player.vote}</p>
<button onClick={()=>handlePlayerVote(player.playerName)} className='px-[2vh] py-[1vh] bg-gray-400'>Vote</button>
{playerRole=='serialKiller' || playerRole=='werewolf' || playerRole=='sheriff'?<div>
  <button onClick={()=>handlePlayerAction('kill',player.playerName)} className='px-[2vh] py-[1vh] bg-gray-400'>kill</button></div>
:playerRole=='doctor'?<
  div><button onClick={()=>handlePlayerAction('protect',player.playerName)} className='px-[2vh] py-[1vh] bg-gray-400'>Protect</button></div>:''}
  

</div>)}
     

    </div>

    <div id='messageBox' className="h-[32vh] w-[100wh] border-2 border-red-500 overflow-y-scroll m-[2vh] text-[2vh] lg:text-[2.5vh] pl-2">
    {playerData[0]?.Chats?.map(chat=><p id={`message`} className=''><span className='text-bold text-red-400 '>{chat.body.user}:</span> {chat.body.message}</p>)}
    {playerData?.map(player=>player.message?<p>{player.message}</p>:'')}

    <div id='end' className='h-[5vh]'>

    </div>
    </div>
    <div className="flex">
   <form onSubmit={handleChat}>
<div className="flex around items-center mt-[1vh] m-[2vh]">
<input id='chat' className='w-[80vw] lg:w-[90vw] h-[8vh] border-red-500 border-2 rounded-lg p-2' type="text" />
<button className='px-4 py-2 bg-green-500 text-bold rounded-lg ml-[1vw] '>send</button>
</div>
   </form>
    </div>

</>
  )
}
