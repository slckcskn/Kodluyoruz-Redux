import { useState } from 'react'

import './App.css'
import Contacts from './components/Contacts/index.jsx'
import Edit from './components/Contacts/Edit.jsx'

import { Routes, Route } from "react-router";

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route index element={<Contacts />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App
