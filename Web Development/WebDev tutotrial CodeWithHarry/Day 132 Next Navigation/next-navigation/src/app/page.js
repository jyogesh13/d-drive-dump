"use client" // Enables client-side rendering for this component

import React, { use, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// Main page component
const Home = () => {
  const router = useRouter(); // Initialize Next.js router
  const searchParams = useSearchParams(); // Get search parameters from the URL


  
  return (
    <>
      {/* This component does not render any visible content */}
      <div>
        {/* Display the current search parameters */}
        <p>Search Params: {searchParams.get('blog')}</p>
        <p>Utm source: {searchParams.get('utm_source')}</p>
      </div>
    </>
  )
}

export default Home // Export the page component as default