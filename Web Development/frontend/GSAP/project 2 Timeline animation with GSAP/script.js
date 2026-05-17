let menuIcon = document.getElementsByTagName("i")[0];
let closeIcon = document.getElementsByTagName("i")[1];
let sideMenu = document.querySelector(".menu");
let tl = gsap.timeline();

tl.to(sideMenu, {
  right: 0,
  duration: 0.4
});
tl.from(`.menu ul li`, {
  x: 150,
  opacity: 0,
  duration: 0.5,
  stagger: 0.28
});
tl.from(`.menu i`,{
    opacity: 0,
    duration: 0.5
})

tl.pause()

menuIcon.addEventListener("click", () => {
    tl.play()
});

closeIcon.addEventListener("click", () => {
  tl.reverse()
});
