// gsap.to("#box1", {
//   x: 1000,
//   duration: 2,
//   delay: 1,
// });
// gsap.to("#box2", {
//   x: 500,
// //   y: 500,
//   duration: 2,
//   delay: 1,
//   rotate: 360,
//   backgroundColor: "blue",
//   borderRadius:"50%",
// });
// gsap.from("#box2", {
//   x: 500,
// //   y: 500,
//   duration: 2,
//   delay: 1,
//   rotate: 360,
//   backgroundColor: "blue",
//   borderRadius:"50%",
// });
// gsap.from("#box2", {
//   x: 1000,
//   y: 50,
//   duration: 2,
//   delay: 1,
// });

// gsap.from("#box1 h1",{
//     opacity: 0,
//     duration: 1,
//     y: 30,
//     delay: 1,
//     stagger: 0.5
// })
// gsap.to("#box1",{
//     x:1200,
//     duration: 2,
//     delay: 1,
//     rotate: 360,
//     repeat: -1,
//     yoyo:true
// })


let tl = gsap.timeline()

tl.from(".part1",{
    y:-30,
    opacity: 0,
    duration: 0.5,
    delay: 0.5
})
tl.from(".part2 ul li",{
    y:-30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5
})
tl.from("h1",{
    y:30,
    opacity: 0,
    duration: 0.5,
    scale: 0.2
})