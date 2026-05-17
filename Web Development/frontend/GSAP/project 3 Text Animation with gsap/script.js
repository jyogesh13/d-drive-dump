function breakTheText() {
  let h1 = document.querySelector(".text h1");
  let h1Text = h1.textContent;

  let splittedText = h1Text.split("");
  let mid = Math.floor(splittedText.length / 2);

  let clutter = "";

  splittedText.forEach((elem, index) => {
    if (index < mid) {
      clutter += `<span class="a">${elem}</span>`;
    } else {
      clutter += `<span class="b">${elem}</span>`;
    }
  });
  h1.innerHTML = clutter
}

breakTheText()

gsap.from("h1 .a", {
  y: 100,
  opacity: 0,
  duration: 0.6,
  delay:0.4,
  stagger: 0.15
});
gsap.from("h1 .b", {
  y: 100,
  opacity: 0,
  duration: 0.6,
  delay:0.4,
  stagger: -0.15
});
