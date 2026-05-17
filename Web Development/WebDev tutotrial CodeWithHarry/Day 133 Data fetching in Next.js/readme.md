# Data Fetching in Next.js

## SSR : Server side rendering
This is default behaviour everything is by default rendered on the server side, and to show it on client side we have to use "use client".
## SSG : Static site generation
any content which does not have network calls is by default a static page.
## ISG or ISR : Icremental static regeneration 
fetch in Next.js caches the response
to opt out use:
```
    export const dynamic = 'force-dynamic'
```
however there are exceptions, fetch requests are not cached when:
  - used inside a server action
  - used inside a route handler that uses the POST method