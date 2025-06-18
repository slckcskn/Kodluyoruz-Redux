import React from 'react'
import Product from '../Product/Product';
import { Row } from 'react-bootstrap';
import './ProductList.css'
import { useSelector } from 'react-redux';


function ProductList() {
  const products = useSelector((state) => state.products.items)

  return (
    <Row className='product-list'>

          {products.map((item) => {
            return <Product key={item.id} product={item} />
          })}

    </Row>
  )
}

export default ProductList