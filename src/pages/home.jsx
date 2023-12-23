import React, {  } from 'react'
import { UseProductContext } from '../contexts/productContext'
import { products } from '../mock/products'
import MapOfProducts from '../component/mapOfProducts/mapOfProducts'

const Home = () => {
  
console.log("home")
  return (
    <div>
    Home
        <ul className='products'>
            {products.map((product , i )=>{
                return (<MapOfProducts key={i} product={product}/>)
            })}
        </ul>
    </div>
  )
}

export default Home
