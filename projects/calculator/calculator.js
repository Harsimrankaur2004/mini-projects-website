let calculatorKey = document.querySelectorAll(".key");

calculatorKey.forEach((key) => {
  key.addEventListener("click", () => {
    let screen = document.querySelector(".calculator-screen");
    let keyValue = key.textContent;
    if (keyValue === "=") {
      try{
        screen.value = eval(screen.value);
      }catch {
        screen.value = "Error";
      }
    } else if (keyValue === "Clear") {
      screen.value = "";
    } else {
      screen.value += keyValue;
    }
  });
});

document.addEventListener("keydown", e => {
  if(e.key === "Enter"){
    document.querySelector(".key-equals").click();
    e.preventDefault();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "c") {
    document.querySelector(".key-clear").click();
    e.preventDefault();
  }
});