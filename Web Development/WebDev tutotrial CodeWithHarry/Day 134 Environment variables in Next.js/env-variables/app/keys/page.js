"use client"
import React from 'react'

const Keys = () => {
  return (
    <div>
      The public ID is: {process.env.NEXT_PUBLIC_ID} <br />
      The public key is: {process.env.NEXT_PUBLIC_SECRET} <br />
    </div>
  )
}

export default Keys
