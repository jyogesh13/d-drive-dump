// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// export const config = {
//   matcher: '/about/:path*',
// }

import { NextResponse } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}


/*Certainly! Here are some practical use cases for middleware in Next.js:

Authentication & Authorization
Redirect users to a login page if they are not authenticated, or restrict access to certain routes based on user roles.

Localization / Internationalization
Detect the user's preferred language from cookies or headers and redirect them to the appropriate locale route (e.g., /en, /fr).

A/B Testing
Assign users to different experiment groups and serve different content or features based on their group.

Logging & Analytics
Log requests, collect analytics, or inject tracking headers before the request reaches your pages or API routes.

Maintenance Mode
Redirect all users to a maintenance page when your site is under maintenance, except for certain IPs or admin users.

Custom Headers or Security
Add or modify HTTP headers for security (e.g., CSP, CORS) or other purposes before the response is sent. */