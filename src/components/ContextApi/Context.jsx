import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext(null)


export default function Context({children}) {

  const [userName,setUserName]=useState('abir')  
    
  const authInfo={
    userName,setUserName

  }  

 


  return (
   <AuthContext.Provider value={authInfo}>
      {children}
   </AuthContext.Provider>
  )
}
