gsap.from(".page1 .box", {
  scale: 0,
  opacity: 0,
  rotate: 360,
  duration: 1,
  delay: 1,
});
// gsap.from(".page2 .box", {
//   scale: 0,
//   opacity: 0,
//   rotate: 360,
//   duration: 1,
//   delay: 1,
//   scrollTrigger: {
//     trigger: ".page2 .box",
//     scroller:"body",
//     markers: true,
//     start: "top 60%",
//     end: "top 30%",
//     scrub: 2 //1-5
//   },
// });
gsap.to(".page2 h1",{
    transform: "translateX(-200%)",
    scrollTrigger:{
        trigger: ".page2", //parent of the element
        scroller: "body",
        markers: true,
        start: "top 0%",
        end: "top -150%",
        pin:true,
        scrub: 2
    }
    
})
