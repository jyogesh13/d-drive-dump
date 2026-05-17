import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import { useSelector, useDispatch } from 'react-redux'
// import { increment, decrement } from './redux/counter/counterSlice'
import { addItem, removeItem, updateQuantity, clearCart } from './redux/cart/cartSlice'


function App() {
  
  // const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    quantity: 1
  }

  return (
    <>
    {/* <Navbar/> */}
      {/* <div>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <span>Currently the count is: {count}</span>
        <button onClick={()=>dispatch(increment())}>+</button>
      </div> */}
      <div className='product'>
        
      </div>
      <div>
        
      </div>
    </>
  )
}

export default App
