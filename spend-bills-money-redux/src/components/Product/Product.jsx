import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { buy, sell } from '../../redux/ProductsSlice'
import './Product.css'


function Product({ product }) {
  const [amount, setAmount] = useState(0);

  const money = useSelector((state) => state.products.money)

  const dispatch = useDispatch()

  const handleBuy = (product) => {
    const newAmount = amount + 1;
    setAmount(newAmount);
    dispatch(buy({ id: product.id, newAmount, price: product.price }))
  }

  const handleSell = () => {
    const newAmount = amount - 1
    setAmount(newAmount);
    dispatch(sell({ id: product.id, newAmount, price: product.price }))
  }

  return (


    <Card style={{ width: '18rem' }} className='product-card'>
      <Card.Img variant="top" src={product.image} className='product-image' />
      <Card.Body className='product-body'>
        <Card.Title className='product-name'>{product.name}</Card.Title>
        <Card.Text className='product-cost'>
          {`$${product.price.toLocaleString()}`}
        </Card.Text>
        <div className='product-buttons'>
          <Button variant="danger" onClick={() => handleSell(product)} disabled={amount === 0}>Sell</Button>
          <input type="text" className='item-input' value={amount} readOnly></input>
          <Button variant="primary" onClick={() => handleBuy(product)} disabled={money < product.price}>Buy</Button>
        </div>
      </Card.Body>
    </Card>

  )
}

export default Product