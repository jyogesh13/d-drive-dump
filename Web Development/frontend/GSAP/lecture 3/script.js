let path = `M 10 250 Q 640 0 1290 250`;
let finalPath = `M 10 250 Q 640 250 1290 250`;

let string = document.querySelector(".part1");

string.addEventListener("mousemove", function (dets) {
  path = `M 10 250 Q ${dets.x} ${dets.y} 1290 250`;
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
    ease: "power3.out"
  });
});
string.addEventListener("mouseleave", function (dets) {
  gsap.to("svg path", {
    attr: { d: finalPath },
    duration: 0.8,
    ease: "elastic.out(1,0.2)"
  });
});
