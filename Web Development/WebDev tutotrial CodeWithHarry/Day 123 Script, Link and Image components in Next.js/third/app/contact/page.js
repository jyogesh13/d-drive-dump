import React from 'react'
import Script from 'next/script'

const contact = () => {
  return (
    <div>
      I am contact page
      <Script>
        {`alert("Welcome to Contact page")`}
      </Script>
    </div>
  )
}

export default contact

export const metadata = {
  title:"Contact Facebook",
  description:"This is contact page of Facebook"
};