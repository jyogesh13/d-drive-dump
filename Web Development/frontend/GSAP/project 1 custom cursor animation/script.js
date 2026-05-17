let cursor = document.querySelector(".cursor")
let main = document.querySelector(".main")
let imgContainer = document.querySelector(".image")

main.addEventListener("mousemove",(dets)=>{
    gsap.to(cursor,{
        x:dets.x-1,
        y:dets.y-1,
        duration: 0.3
    })
})

imgContainer.addEventListener("mouseenter",()=>{
    cursor.innerHTML = `View more`
    gsap.to(cursor,{
        scale: 2,
        backgroundColor: '#fffefe6a'
    })
})
imgContainer.addEventListener("mouseleave",()=>{
    cursor.innerHTML = ``
    gsap.to(cursor,{
        scale: 1,
        backgroundColor: 'white'
    })
})
