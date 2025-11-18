const color = ["#31c9e4", "#e831c9", "#c9e831", "#e8c931", "#31e8c9", "#c931e8"];

document.getElementById("btn")
  .addEventListener("click", () => {
    const randomColor = Math.floor(Math.random() * color.length);
    document.querySelector(".box")
      .style.backgroundColor = color[randomColor];
    document.getElementById("color")
      .textContent = `Background Color: ${color[randomColor]}`;
  });