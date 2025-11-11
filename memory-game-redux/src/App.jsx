import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='container d-flex flex-column justify-content-between'>
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  )
}

export default App
