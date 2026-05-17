"use client"
import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <h1>This is about page</h1>
      <h2>This page gives info about the website</h2>

      <style jsx>
        {`
          .container {
            background-color: lightblue;
            padding: 20px;
            border-radius: 10px;
            color: crimson;
          }
        `}
      </style>
    </div>
  )
}

export default About
