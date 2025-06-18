import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './Receipt.css'
import numeral from 'numeral';


function Receipt() {
  const cart = useSelector((state) => state.products.cart)
  const cartTotal = useSelector((state) => state.products.cartTotal)

  return (
    cart.length > 0 && (
      <Container className='receipt'>
        <div className='receipt-title'>Your Receipt</div>
        {cart.map((item) => (
          <div className='receipt-item' key={item.id}>
            <div className='item-name'>{item.name}</div>
            <div className='item-amount'>x{item.amount}</div>
            <div className='item-cost'>${numeral(item.amount * item.price).format('0.[0]a')}</div>
          </div>
        ))}
        <div className='receipt-total'>Total: ${numeral(cartTotal).format('0.[0]a')}</div>
      </Container>
    )
  )
}

export default Receipt