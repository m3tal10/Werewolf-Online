import React from 'react'

export default function Lobby() {
  return (
<>


<div className="text-center text-5vh">
    <p>Lobby 1</p>
</div>
<div className='w-screen h-[55vh] grid grid-cols-4 '>
        <div className="border-2 border-black flex justify-center items-center">1</div>
        <div className="border-2 border-black flex justify-center items-center">2</div>
        <div className="border-2 border-black flex justify-center items-center">3</div>
        <div className="border-2 border-black flex justify-center items-center">4</div>
        <div className="border-2 border-black flex justify-center items-center">5</div>
        <div className="border-2 border-black flex justify-center items-center">6</div>
        <div className="border-2 border-black flex justify-center items-center">7</div>
        <div className="border-2 border-black flex justify-center items-center">8</div>
        <div className="border-2 border-black flex justify-center items-center">9</div>
        <div className="border-2 border-black flex justify-center items-center">10</div>
        <div className="border-2 border-black flex justify-center items-center">11</div>
        <div className="border-2 border-black flex justify-center items-center">12</div>
        <div className="border-2 border-black flex justify-center items-center">13</div>
        <div className="border-2 border-black flex justify-center items-center">14</div>
        <div className="border-2 border-black flex justify-center items-center">15</div>
        <div className="border-2 border-black flex justify-center items-center">16</div>

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
