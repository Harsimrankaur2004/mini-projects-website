const popup = document.querySelector(".popup");
const agreeBtn = document.getElementById("agreeBtn");
const okBtn = document.getElementById("okBtn");

agreeBtn.addEventListener("click", () => {
  popup.classList.add("open-popup");
});

okBtn.addEventListener("click", () => {
  popup.classList.remove("open-popup");
});