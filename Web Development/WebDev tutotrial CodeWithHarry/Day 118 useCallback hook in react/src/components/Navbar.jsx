import React from 'react'
import { memo } from 'react'
const Navbar = ({onIncrement}) => {
  return (
    <div>
      {console.log('Display counter render')}
      <button onClick={onIncrement}>Increment</button>
    </div>
  )
}

export default memo(Navbar)
