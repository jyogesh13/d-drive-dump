"use client" // Enables client-side rendering for this dynamic route

import React from 'react'
import { useParams } from 'next/navigation'

// Page component for displaying a blog post based on the dynamic 'slug' parameter
const page = () => {
    const params = useParams(); // Get route parameters (e.g., slug)
    return (
        <div>
            <h1>Blog Post</h1>
            {/* Display the slug from the URL */}
            <p>Slug: {params.slug}</p>
        </div>  
    )
}

export default page // Export the page component as default
