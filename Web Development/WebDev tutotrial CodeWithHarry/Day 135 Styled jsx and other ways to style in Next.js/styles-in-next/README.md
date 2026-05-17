# Ways to style in Next.js
    - global.css in which we provide the relevant styles or import tailwindcss to style our components.
    - css on module level by creating a styles/[pageName].module.css and importing it into the relevant page.
    - <style jsx>: make the page a client component for this and apply a localised styling to a particular section of page or the whole page (<style jsx global>) 