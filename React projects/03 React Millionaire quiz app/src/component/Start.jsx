import React from 'react'
import { useRef } from 'react'

const Start = ({setUserName}) => {
    const inputRef = useRef()
    const handleClick = ()=>{
        inputRef.current.value && setUserName(inputRef.current.value)
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    
  return (
    <div className='start'>
      <h1>Who Wants to Be a Millionaire?</h1>
      <p>Test your knowledge and climb the money ladder!</p>
      <input 
        type="text" 
        placeholder='Enter your name to begin' 
        className='startInput' 
        ref={inputRef} 
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <button className='startBtn' onClick={handleClick}>
        Start Game
      </button>
    </div>
  )
}

export default Start
