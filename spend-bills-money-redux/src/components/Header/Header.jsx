import React from 'react'
import { Container} from 'react-bootstrap';
import './Header.css';

function Header() {
  return ( 

        <Container className='title'>
            <img src="https://neal.fun/spend/billgates.jpg" alt="Bill Gates" />
            <h1>Spend Bill Gates Money</h1>
        </Container>
  )
}

export default Header