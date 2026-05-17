"use client" // Enables client-side rendering for this component

import React, {useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Navbar component displays current path and a navigation button
const Navbar = () => {
    const pathname = usePathname() // Get the current route path
    const router = useRouter()     // Initialize Next.js router

    // Redirect to '/dashboard' after 2 seconds
//   useEffect(() => {
//       setTimeout(() => {
//           router.push('/dashboard')
//     }, 2000);
//   }, [])

    return (
        <div>
            I am the navbar
            {/* Display the current path */}
            <p>Current Path: {pathname}</p>
            {/* Button to navigate to the dashboard page */}
            <button
                className='cursor-pointer bg-green-300'
                type="button"
                onClick={() => router.push('/dashboard')}
            >
                Dashboard
            </button>
        </div>
    )
}

export default Navbar // Export the Navbar component as
