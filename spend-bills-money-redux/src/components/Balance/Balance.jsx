import React from 'react'
import {Container} from 'react-bootstrap'
import './Balance.css'
import { useSelector } from 'react-redux'

function Balance() {
  const money = useSelector((state) => state.products.money)

  return (
    <Container className='money'>{`$${money.toLocaleString()}`}</Container>
  )
}

export default Balance