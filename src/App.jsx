import React from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="*" element={<Error />} />
    </Route>
  ))

  return (
    <>
    <RouterProvider element={router}/>
    </>
  )
}

export default App
