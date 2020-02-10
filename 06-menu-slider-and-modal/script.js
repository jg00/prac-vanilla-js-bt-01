const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal overlay and the modal
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// Hide modal
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// Hide modal on outside click
window.addEventListener("click", e => {
  // console.log(e.target);
  e.target === modal ? e.target.classList.remove("show-modal") : false;
});
