import './App.css'
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header'
import Balance from './components/Balance/Balance';
import ProductList from './components/ProductList/ProductList'
import Receipt from './components/Receipt/Receipt';

function App() {

  return (
    <>
    <Container className='App'>

          <Header />

          <Balance />

          <ProductList />

          <Receipt />

    </Container>
    
    <div className='footer'></div>
  </>
  )
}

export default App
